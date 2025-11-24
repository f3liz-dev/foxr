#!/usr/bin/env node

/**
 * Standalone test to verify Chrome context functionality in Foxr
 * 
 * This test demonstrates:
 * 1. Launching Firefox with -remote-allow-system-access flag
 * 2. Setting context to Chrome
 * 3. Accessing Services.appinfo.version from Firefox chrome context
 * 4. Resetting context back to content
 */

const foxr = require('../build/index.js').default;

(async () => {
  let browser;
  let exitCode = 0;
  
  try {
    console.log('='.repeat(60));
    console.log('Testing Foxr Chrome Context Functionality');
    console.log('='.repeat(60));
    
    // Launch Firefox with our own binary
    console.log('\n1. Launching Firefox with -remote-allow-system-access...');
    browser = await foxr.launch({
      executablePath: '/usr/bin/firefox',
      headless: true
    });
    console.log('   ✓ Firefox launched successfully');
    
    // Get the first page
    const pages = await browser.pages();
    const page = pages[0];
    console.log('   ✓ Got initial page');
    
    // Test 1: getPref (which uses Chrome context internally)
    console.log('\n2. Testing getPref (uses Chrome context internally)...');
    const prefValue = await browser.getPref('browser.startup.page');
    console.log(`   ✓ getPref successful, value: ${prefValue}`);
    
    // Test 2: Directly test setContext(Chrome) and Services.appinfo.version
    console.log('\n3. Testing direct Chrome context access...');
    
    // Access the private _send method (for demonstration purposes)
    const send = browser._send;
    
    // Set context to Chrome
    await send('Marionette:SetContext', { value: 'chrome' });
    console.log('   ✓ Context set to Chrome');
    
    // Execute script to get Services.appinfo.version
    const version = await send('WebDriver:ExecuteScript', {
      script: 'return Services.appinfo.version;',
      args: []
    }, 'value');
    
    console.log(`   ✓ Services.appinfo.version: ${version}`);
    
    // Reset context back to content
    await send('Marionette:SetContext', { value: 'content' });
    console.log('   ✓ Context reset to content');
    
    // Verify we can still interact with content
    await page.goto('data:text/html,<h1>Test</h1>');
    const title = await page.evaluate('document.querySelector("h1").textContent');
    console.log(`   ✓ Content context working, got: ${title}`);
    
    console.log('\n' + '='.repeat(60));
    console.log('✓ All tests passed!');
    console.log('='.repeat(60));
    console.log('\nSummary:');
    console.log('- Successfully launched Firefox with local binary');
    console.log('- Successfully set context to Chrome');
    console.log('- Successfully retrieved Services.appinfo.version:', version);
    console.log('- Successfully reset context to content');
    console.log('- All functionality verified');
    
    await browser.close();
    
  } catch (error) {
    console.error('\n' + '='.repeat(60));
    console.error('✗ Test failed!');
    console.error('='.repeat(60));
    console.error('\nError:', error.message);
    console.error('\nStack trace:');
    console.error(error.stack);
    exitCode = 1;
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (e) {
        // Ignore close errors
      }
    }
  }
  
  process.exit(exitCode);
})();

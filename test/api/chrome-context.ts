import test from 'blue-tape'
import foxr from '../../src/'
import { testWithFirefox } from '../helpers/firefox'

test('Browser: `setContext(Chrome)` and Services.appinfo.version', testWithFirefox(async (t) => {
  const browser = await foxr.connect()

  // Access the private _send method to test Chrome context
  // @ts-ignore - accessing private method for testing
  const send = browser._send

  try {
    // Set context to Chrome
    await send('Marionette:SetContext', { value: 'chrome' })

    // Execute script to get Services.appinfo.version
    const version = await send('WebDriver:ExecuteScript', {
      script: 'return Services.appinfo.version;',
      args: []
    }, 'value')

    t.true(
      typeof version === 'string' && version.length > 0,
      'should return Firefox version string'
    )

    // Reset context back to content
    await send('Marionette:SetContext', { value: 'content' })

    t.pass('successfully set context to Chrome and back to content')
  } catch (err) {
    t.fail(`Failed to use Chrome context: ${err.message}`)
  }
}))

import { tracked } from '@glimmer/tracking';
import Controller from '@ember/controller';
import { action } from '@ember/object';
// Using normal/node/ESM import
import { parse } from 'csv-parse';
// Alternatively:
//import { parse } from 'csv-parse/sync';
//import { parse } from 'csv-parse/browser/esm';
//import { parse } from 'csv-parse/browser/esm/sync';

//import process from 'process';
//import Buffer from 'buffer';

// With embroider these now work (because Webpack sees them and does its ProvidePlugin thing?)
try {
  console.log('Buffer -->', Buffer); // eslint-disable-line no-undef
} catch (e) {
  console.warn(`Buffer not global in ember app controller module`, e);
}

try {
  console.log('process -->', process); // eslint-disable-line no-undef
} catch (e) {
  console.warn(`process not global in ember app controller module`, e);
}

export default class ApplicationController extends Controller {
  @tracked records = [];

  // Using stream API
  // Adapted from https://github.com/adaltas/node-csv/tree/master/packages/csv-parse#example
  @action
  runExample() {
    console.log(`runExample called`);
    const records = this.records;
    const parser = parse({
      delimiter: ':',
    });
    console.log(`parse called`);
    // Use the readable stream api to consume records
    parser.on('readable', function () {
      let record;
      while ((record = parser.read()) !== null) {
        records.pushObject(record);
      }
    });
    // Catch any error
    parser.on('error', function (err) {
      console.error(err.message);
    });
    console.log(`parse event handlers bound`);
    // Test that the parsed records matched the expected records
    /*
    parser.on('end', function() {
      assert.deepStrictEqual(
        records,
        [
          [ 'root','x','0','0','root','/root','/bin/bash' ],
          [ 'someone','x','1022','1022','','/home/someone','/bin/bash' ],
        ]
      );
    });
*/
    // Write data to the stream
    parser.write('root:x:0:0:root:/root:/bin/bash\n');
    parser.write('someone:x:1022:1022::/home/someone:/bin/bash\n');
    console.log(`parser data written`);
    // Close the readable stream
    parser.end();
    console.log(`runExample finished`);
  }
}

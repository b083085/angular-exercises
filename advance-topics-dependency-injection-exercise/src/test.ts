// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// Initialize the Angular testing environment
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  { teardown: { destroyAfterEach: true } } // Better test isolation
);

// Find all the tests
const testContext = (require as any).context(
  './', // Look in the current directory
  true, // Recurse into subdirectories
  /\.spec\.ts$/ // Match files ending with .spec.ts
);

// Load all test modules
testContext.keys().forEach(testContext);

/*
 * Copyright (c) 2016, Salesforce.com, Inc.
 * All rights reserved.
 *
 * Legal Text is available at https://github.com/forcedotcom/Legal/blob/master/License.txt
 */

'use strict';

var assert   = require('assert');
var FuelAuth = require('../lib/fuel-auth');

// this only done for linting reasons. No difference between FuelAuth
var nonConstructorFuelAuth = require('../lib/fuel-auth');

describe('General Tests', function() {
	it('should be a constructor', function() {
		assert.equal(typeof FuelAuth, 'function');
	});

	it('should not need to use "new" when instantiating', function() {
		// Arrange
		var options = {
			clientId: '<test>',
			clientSecret: '<test>',
			authUrl: '<test auth url>'
		};

		// Act
		var client = nonConstructorFuelAuth(options);

		// Assert
		assert.equal(client.authUrl, options.authUrl);
	});

	it('should require clientId and clientSecret', function() {
		var AuthClient;

		// testing with nothing passed into constructor
		try {
			AuthClient = new FuelAuth();
		} catch(err) {
			assert.equal(err.message, 'options are required. see readme.');
		}

		// testing with clientId passed into constructor
		try {
			AuthClient = new FuelAuth({ clientId: 'test' });
		} catch(err) {
			assert.equal(err.message, 'clientId or clientSecret is missing or invalid');
		}

		// testing with clientSecret passed into constructor
		try {
			AuthClient = new FuelAuth({ clientSecret: 'test' });
		} catch(err) {
			assert.equal(err.message, 'clientId or clientSecret is missing or invalid');
		}

		// testing with clientId and clientSecret passed as objects into constructor
		try {
			AuthClient = new FuelAuth({
				clientId: { test: 'test' }
				, clientSecret: { test: 'test' }
			});
		} catch(err) {
			assert.equal(err.message, 'clientId or clientSecret must be strings');
		}

		AuthClient = new FuelAuth({
			clientId: 'test'
			, clientSecret: 'test'
		});

		assert.equal(typeof AuthClient, 'object');
	});

	it('should have getAccessToken on prototype', function() {
		assert.equal(typeof FuelAuth.prototype.getAccessToken, 'function');
	});

	it('should have isExpired on prototype', function() {
		assert.equal(typeof FuelAuth.prototype.isExpired, 'function');
	});

	it('should have invalidateToken on prototype', function() {
		assert.equal(typeof FuelAuth.prototype.invalidateToken, 'function');
	});
});

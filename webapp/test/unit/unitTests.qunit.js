/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"projecto_hola_mundo/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});

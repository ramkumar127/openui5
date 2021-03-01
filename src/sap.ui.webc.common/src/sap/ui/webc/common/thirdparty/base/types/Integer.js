sap.ui.define(['./DataType'], function (DataType) { 'use strict';

	class Integer extends DataType {
		static isValid(value) {
			return Number.isInteger(value);
		}
	}

	return Integer;

});

sap.ui.define([
	"sap/ui/core/ResizeHandler"
], function (ResizeHandler) {
	"use strict";

	return {

		_mOverlays: new Map(),

		/**
		 * Toggles an overlay over the given grid-based layout to outline all grid cells.
		 * @param {string[]|string} oId ID of the grid-based layout control
		 * @param {sap.ui.core.mvc.View} oView The view that the grid-based control is held in
		 */
		toggle: function (oId, oView, oRoot, bIsMain) {
			if (typeof oId == "string") {
				oId = [oView.byId(oId).getId()];
			}

			if (!Array.isArray(oId)) {
				return;
			}

			oId.forEach(function (sId) {
				var oGridControl = oView.byId(sId),
					sGridId = oGridControl.getId();

				if (!this._mOverlays.get(sGridId)) {
					this._mOverlays.set(sGridId, this._createOverlay(oGridControl, oRoot, bIsMain));
				}

				var oInstance = this._mOverlays.get(sGridId);
				if (oInstance.oOverlay.style.display === "none") {
					oInstance.oOverlay.style.display = "grid";
				} else {
					oInstance.oOverlay.style.display = "none";
				}
			}.bind(this));
		},

		/**
		 * Destroys an overlay.
		 * @param {string[]|string} oId ID of the grid-based layout control
		 * @param {sap.ui.core.mvc.View} oView The view that the grid-based control is held in
		 */
		destroy: function (oId, oView) {
			if (typeof oId == "string") {
				oId = [oView.byId(oId).getId()];
			}
			if (!Array.isArray(oId)) {
				return;
			}
			oId.forEach(function (sId) {
				var oGridControl = oView.byId(sId),
					sGridId = oGridControl.getId();

				var oInstance = this._mOverlays.get(sGridId);
				if (!oInstance) {
					return;
				}
				if (oInstance.oOverlay) {
					oInstance.oOverlay.remove();
					delete oInstance.oOverlay;
				}
				if (oInstance.oWrapper) {
					oInstance.oWrapper.remove();
					delete oInstance.oWrapper;
				}
				if (oInstance.sResizeHandlerId) {
					ResizeHandler.deregister(oInstance.sResizeHandlerId);
					delete oInstance.sResizeHandlerId;
				}
				if (oInstance.oDelegate) {
					oGridControl.removeEventDelegate(oInstance.oDelegate);
					delete oInstance.oDelegate;
				}
				this._mOverlays.delete(sGridId);
			}.bind(this));
		},

		_createOverlay: function (oGridControl, oRoot, bIsMain) {
			var oInstance = {};
			var oGridDomRef = this._findGridWithinElement(oGridControl.getDomRef()),
				oGridRect = oGridDomRef.getBoundingClientRect(),
				oRootDomRef = oRoot.getDomRef(),
				oRootRect = oRootDomRef.getBoundingClientRect();

			oInstance.oGridControl = oGridControl;
			oInstance.oWrapper = document.createElement("div");
			oInstance.oWrapper.classList.add("sapSampleRevealGridWrapper");
			oInstance.oWrapper.style.top = oGridRect.top - oRootRect.top + "px";
			oInstance.oWrapper.style.left = oGridRect.left - oRootRect.left + "px";

			oRootDomRef.prepend(oInstance.oWrapper);

			oInstance.oOverlay = oGridDomRef.cloneNode();
			oInstance.oOverlay.id += "-overlay";
			var mInitialStyle = {
				display: "none"
			};
			this._fillOverlayGrid(oInstance.oOverlay, oGridDomRef, bIsMain);
			this._cloneGridStyle(oInstance.oOverlay, oGridDomRef, mInitialStyle);

			oInstance.sResizeHandlerId = ResizeHandler.register(oInstance.oGridControl, this._resizeHandler.bind(this));

			oInstance.oDelegate = {
				onBeforeRendering: function () {
					// detach overlay before render manager clears it
					oInstance.oWrapper.remove();
				},

				onAfterRendering: function () {
					var oGridDomRef = this._findGridWithinElement(oInstance.oGridControl.getDomRef()),
						oGridRect = oGridDomRef.getBoundingClientRect(),
						oRootDomRef = oRoot.getDomRef(),
						oRootRect = oRootDomRef.getBoundingClientRect();

					this._fillOverlayGrid(oInstance.oOverlay, oGridDomRef, bIsMain);
					this._cloneGridStyle(oInstance.oOverlay, oGridDomRef);
					// reattach overlay on newly rendered grid control

					oRootDomRef.prepend(oInstance.oWrapper);
					oInstance.oWrapper.style.top = oGridRect.top - oRootRect.top + "px";
					oInstance.oWrapper.style.left = oGridRect.left - oRootRect.left + "px";
				}
			};
			oGridControl.addDelegate(oInstance.oDelegate, false, this);

			oInstance.oWrapper.prepend(oInstance.oOverlay);
			return oInstance;
		},

		_cloneGridStyle: function (oOverlay, oGridDomRef, mAdditionalStyle) {
			var mGridStyle = window.getComputedStyle(this._findGridWithinElement(oGridDomRef));
			var mOverlayStyle = {
				columnGap: mGridStyle.columnGap,
				rowGap: mGridStyle.rowGap,
				gridTemplateRows: mGridStyle.gridTemplateRows,
				gridTemplateColumns: mGridStyle.gridTemplateColumns
			};
			Object.assign(oOverlay.style, mOverlayStyle, mAdditionalStyle);
			oOverlay.className = oGridDomRef.className + " sapSampleRevealGridOverlay";
		},

		_fillOverlayGrid: function (oOverlay, oGridDomRef, bIsMain) {
			while (oOverlay.lastChild) {
				oOverlay.removeChild(oOverlay.lastChild);
			}
			var iOverlayItems = this._getOverlayItemsCount(oGridDomRef);
			for (var i = 0; i < iOverlayItems; i++) {
				var oItem = document.createElement("div");

				if (bIsMain) {
					oItem.classList.add("sapSampleRevealGridItemMain");
				} else {
					oItem.classList.add("sapSampleRevealGridItem");
				}

				oOverlay.appendChild(oItem);
			}
		},

		_getOverlayItemsCount: function (oGridDomRef) {
			var mGridStyles = window.getComputedStyle(oGridDomRef),
				sRows = mGridStyles.gridTemplateRows,
				sColumns = mGridStyles.gridTemplateColumns,
				iRows = sRows.split(/\s+/).length,
				iColumns = sColumns.split(/\s+/).length;

			return iRows * iColumns;
		},

		_resizeHandler: function (oEvent) {
			oEvent.control.invalidate();
		},

		_findGridWithinElement: function (oDomRef) {
			if (window.getComputedStyle(oDomRef).display === "grid") {
				return oDomRef;
			}

			if (oDomRef.hasChildNodes()) {
				for (var i = 0; i < oDomRef.children.length; i++) {
					var oGrid = this._findGridWithinElement(oDomRef.children[i]);
					if (oGrid) {
						return oGrid;
					}
				}
			}
		}
	};
});
/*!
 * ${copyright}
 */

// Provides control sap.ui.table.Table.
sap.ui.define(['jquery.sap.global', 'sap/ui/core/Control', 'sap/ui/core/ResizeHandler', 'sap/ui/core/delegate/ItemNavigation', 'sap/ui/core/theming/Parameters', 'sap/ui/model/SelectionModel', 'sap/ui/model/ChangeReason', './Row', './library', 'sap/ui/core/IconPool', 'sap/ui/Device', './TableAccExtension', 'jquery.sap.trace'],
	function(jQuery, Control, ResizeHandler, ItemNavigation, Parameters, SelectionModel, ChangeReason, Row, library, IconPool, Device, TableAccExtension /*,jQuerySAPTrace*/) {
	"use strict";



	/**
	 * Constructor for a new Table.
	 *
	 * @param {string} [sId] id for the new control, generated automatically if no id is given
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @class
	 * <p>
	 *     Provides a comprehensive set of features for displaying and dealing with vast amounts of data. The Table control supports
	 *     desktop PCs and tablet devices. On tablets, special consideration should be given to the number of visible columns
	 *     and rows due to the limited performance of some devices.
	 * </p>
	 * <p>
	 *     In order to keep the document DOM as lean as possible, the Table control reuses its DOM elements of the rows.
	 *     When the user scrolls, only the row contexts are changed but the rendered controls remain the same. This allows
	 *     the Table control to handle huge amounts of data. Nevertheless, restrictions apply regarding the number of displayed
	 *     columns. Keep the number as low as possible to improve performance. Due to the nature of tables, the used
	 *     control for column templates also has a big influence on the performance.
	 * </p>
	 * <p>
	 *     The Table control relies completely on data binding, and its supported feature set is tightly coupled to
	 *     the data model and binding being used.
	 * </p>
	 *
	 *
	 * @extends sap.ui.core.Control
	 * @version ${version}
	 *
	 * @constructor
	 * @public
	 * @alias sap.ui.table.Table
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var Table = Control.extend("sap.ui.table.Table", /** @lends sap.ui.table.Table.prototype */ { metadata : {

		library : "sap.ui.table",
		properties : {

			/**
			 * Width of the Table.
			 */
			width : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : 'auto'},

			/**
			 * Height of a row of the Table in pixel.
			 */
			rowHeight : {type : "int", group : "Appearance", defaultValue : null},

			/**
			 * Height of the column header of the Table in pixel.
			 */
			columnHeaderHeight : {type : "int", group : "Appearance", defaultValue : null},

			/**
			 * Flag whether the column header is visible or not.
			 */
			columnHeaderVisible : {type : "boolean", group : "Appearance", defaultValue : true},

			/**
			 * Number of visible rows of the table.
			 */
			visibleRowCount : {type : "int", group : "Appearance", defaultValue : 10},

			/**
			 * First visible row.
			 */
			firstVisibleRow : {type : "int", group : "Appearance", defaultValue : 0},

			/**
			 * Selection mode of the Table. This property controls whether single or multiple rows can be selected and
			 * how the selection can be extended. It may also influence the visual appearance.
			 */
			selectionMode : {type : "sap.ui.table.SelectionMode", group : "Behavior", defaultValue : sap.ui.table.SelectionMode.Multi},

			/**
			 * Selection behavior of the Table. This property defines whether the row selector is displayed and whether the row, the row selector or both
			 * can be clicked to select a row.
			 */
			selectionBehavior : {type : "sap.ui.table.SelectionBehavior", group : "Behavior", defaultValue : sap.ui.table.SelectionBehavior.RowSelector},

			/**
			 * Zero-based index of selected item. Index value for no selection is -1.
			 * When multi-selection is enabled and multiple items are selected, the method returns
			 * the lead selected item. Sets the zero-based index of the currently selected item. This method
			 * removes any previous selections. When the given index is invalid, the call is ignored.
			 */
			selectedIndex : {type : "int", group : "Appearance", defaultValue : -1},

			/**
			 * Flag whether the controls of the Table are editable or not (currently this only controls the background color in certain themes!)
			 */
			editable : {type : "boolean", group : "Behavior", defaultValue : true},

			/**
			 * Flag whether to use the scroll mode or paging mode. If the Paginator mode is used it will require the sap.ui.commons library!
			 */
			navigationMode : {type : "sap.ui.table.NavigationMode", group : "Behavior", defaultValue : sap.ui.table.NavigationMode.Scrollbar},

			/**
			 * The <code>threshold</code> defines how many additional (not yet visible records) shall be pre-fetched to enable smooth
			 * scrolling. The threshold is always added to the <code>visibleRowCount</code>. If the <code>visibleRowCount</code> is 10 and the
			 * <code>threshold</code> is 100, there will be 110 records fetched with the initial load.
			 * If the <code>threshold</code> is lower than the <code>visibleRowCount</code>, the <code>visibleRowCount</code> will be used as
			 * the <code>threshold</code>. If the value is 0 then the thresholding is disabled.
			 */
			threshold : {type : "int", group : "Appearance", defaultValue : 100},

			/**
			 * Flag to enable or disable column reordering
			 */
			enableColumnReordering : {type : "boolean", group : "Behavior", defaultValue : true},

			/**
			 * Flag to enable or disable column grouping. (experimental!)
			 */
			enableGrouping : {type : "boolean", group : "Behavior", defaultValue : false},

			/**
			 * Flag to show or hide the column visibility menu. This menu will get displayed in each
			 * generated column header menu. It allows to show or hide columns
			 */
			showColumnVisibilityMenu : {type : "boolean", group : "Appearance", defaultValue : false},

			/**
			 * Flag whether to show the no data overlay or not once the table is empty. If set to false
			 * the table will just show a grid of empty cells
			 */
			showNoData : {type : "boolean", group : "Appearance", defaultValue : true},

			/**
			 * This defines how the table handles the visible rows in the table. The default behavior is,
			 * that a fixed row count is defined. If you change it to auto the visibleRowCount property is
			 * changed by the table automatically. It will then adjust its maximum row count to the space it is
			 * allowed to cover (limited by the surrounding container) and its minimum row count to the value of
			 * the property minAutoRowCount (default value : 5) In manual mode the user can change
			 * the visibleRowCount interactively.
			 * @since 1.9.2
			 * @see sap.ui.table.VisibleRowCountMode
			 */
			visibleRowCountMode : {type : "sap.ui.table.VisibleRowCountMode", group : "Appearance", defaultValue : sap.ui.table.VisibleRowCountMode.Fixed},

			/**
			 * This property is used to set the minimum count of visible rows when the property visibleRowCountMode is set to Auto or Interactive.
			 * For any other visibleRowCountMode, it is ignored.
			 */
			minAutoRowCount : {type : "int", group : "Appearance", defaultValue : 5},

			/**
			 * Number of columns that are fix on the left. When you use a horizontal scroll bar, only
			 * the columns which are not fixed, will scroll. Fixed columns need a defined width for the feature to work.
			 * Please note that the aggregated width of all fixed columns must not exceed the table width since there
			 * will be no scrollbar for fixed columns.
			 */
			fixedColumnCount : {type : "int", group : "Appearance", defaultValue : 0},

			/**
			 * Number of rows that are fix on the top. When you use a vertical scroll bar, only the rows which are not fixed, will scroll.
			 */
			fixedRowCount : {type : "int", group : "Appearance", defaultValue : 0},

			/**
			 * Number of rows that are fix on the bottom. When you use a vertical scroll bar, only the rows which are not fixed, will scroll.
			 * @since 1.18.7
			 */
			fixedBottomRowCount : {type : "int", group : "Appearance", defaultValue : 0},

			/**
			 * Flag whether to show or hide the column menu item to freeze or unfreeze a column.
			 * @since 1.21.0
			 */
			enableColumnFreeze : {type : "boolean", group : "Behavior", defaultValue : false},

			/**
			 * Flag whether to enable or disable the context menu on cells to trigger a filtering with the cell value.
			 * @since 1.21.0
			 */
			enableCellFilter : {type : "boolean", group : "Behavior", defaultValue : false},

			/**
			 * Setting this property to true will show an overlay on top of the Table content and users cannot click anymore on the Table content.
			 * @since 1.21.2
			 */
			showOverlay : {type : "boolean", group : "Appearance", defaultValue : false},

			/**
			 * Specifies if a select all button should be displayed in the top left corner. This button is only displayed
			 * if the row selector is visible and the selection mode is set to any kind of multi selection.
			 * @since 1.23.0
			 */
			enableSelectAll : {type : "boolean", group : "Behavior", defaultValue : true},

			/**
			 * Set this parameter to true to implement your own filter behaviour. Instead of the filter input box a button
			 * will be rendered for which' press event (customFilter) you can register an event handler.
			 * @since 1.23.0
			 */
			enableCustomFilter : {type : "boolean", group : "Behavior", defaultValue : false},

			/**
			 * Set this parameter to true to make the table handle the busy indicator by its own.
			 * The table will switch to busy as soon as it scrolls into an unpaged area. This feature can only
			 * be used when the navigation mode is set to scrolling.
			 * @since 1.27.0
			 */
			enableBusyIndicator : {type : "boolean", group : "Behavior", defaultValue : false},

			/**
			 * Flag to enable or disable column reordering
			 * @deprecated Since version 1.5.2.
			 * Use the property enableColumnReordering instead.
			 */
			allowColumnReordering : {type : "boolean", group : "Behavior", defaultValue : true, deprecated: true},

			/**
			 * This text is shown, in case there is no data available to be displayed in the Table and no custom noData control is set.
			 * @since 1.21.0
			 * @deprecated Since version 1.22.1.
			 * The aggregation noData also supports string values now. Use noData instead.
			 */
			noDataText : {type : "string", group : "Appearance", defaultValue : null, deprecated: true}
		},
		defaultAggregation : "columns",
		aggregations : {

			/**
			 * Control or text of title section of the Table (if not set it will be hidden)
			 */
			title : {type : "sap.ui.core.Control", altTypes : ["string"], multiple : false},

			/**
			 * Control or text of footer section of the Table (if not set it will be hidden)
			 */
			footer : {type : "sap.ui.core.Control", altTypes : ["string"], multiple : false},

			/**
			 * Toolbar of the Table (if not set it will be hidden)
			 */
			toolbar : {type : "sap.ui.core.Toolbar", multiple : false},

			/**
			 * Extension section of the Table (if not set it will be hidden)
			 */
			extension : {type : "sap.ui.core.Control", multiple : true, singularName : "extension"},

			/**
			 * Columns of the Table
			 */
			columns : {type : "sap.ui.table.Column", multiple : true, singularName : "column", bindable : "bindable"},

			/**
			 * Rows of the Table
			 */
			rows : {type : "sap.ui.table.Row", multiple : true, singularName : "row", bindable : "bindable"},

			/**
			 * The value for the noData aggregation can be either a string value or a control instance.
			 * The control is shown, in case there is no data for the Table available. In case of a string
			 * value this will simply replace the no data text.
			 */
			noData : {type : "sap.ui.core.Control", altTypes : ["string"], multiple : false}
		},
		associations : {

			/**
			 * Group By Column (experimental!)
			 */
			groupBy : {type : "sap.ui.table.Column", multiple : false},

			/**
			 * Association to controls / ids which label this control (see WAI-ARIA attribute aria-labelledby).
			 */
			ariaLabelledBy : {type : "sap.ui.core.Control", multiple : true, singularName : "ariaLabelledBy"}
		},
		events : {

			/**
			 * fired when the row selection of the table has been changed (the event parameters can be used to determine
			 * selection changes - to find out the selected rows you should better use the table selection API)
			 */
			rowSelectionChange : {
				parameters : {

					/**
					 * row index which has been clicked so that the selection has been changed (either selected or deselected)
					 */
					rowIndex : {type : "int"},

					/**
					 * binding context of the row which has been clicked so that selection has been changed
					 */
					rowContext : {type : "object"},

					/**
					 * array of row indices which selection has been changed (either selected or deselected)
					 */
					rowIndices : {type : "int[]"}
				}
			},

			/**
			 * fired when a column of the table has been selected
			 */
			columnSelect : {allowPreventDefault : true,
				parameters : {

					/**
					 * reference to the selected column
					 */
					column : {type : "sap.ui.table.Column"}
				}
			},

			/**
			 * fired when a table column is resized.
			 */
			columnResize : {allowPreventDefault : true,
				parameters : {

					/**
					 * resized column.
					 */
					column : {type : "sap.ui.table.Column"},

					/**
					 * new width of the table column as CSS Size definition.
					 */
					width : {type : "sap.ui.core.CSSSize"}
				}
			},

			/**
			 * fired when a table column is moved.
			 */
			columnMove : {allowPreventDefault : true,
				parameters : {

					/**
					 * moved column.
					 */
					column : {type : "sap.ui.table.Column"},

					/**
					 * new position of the column.
					 */
					newPos : {type : "int"}
				}
			},

			/**
			 * fired when the table is sorted.
			 */
			sort : {allowPreventDefault : true,
				parameters : {

					/**
					 * sorted column.
					 */
					column : {type : "sap.ui.table.Column"},

					/**
					 * Sort Order
					 */
					sortOrder : {type : "sap.ui.table.SortOrder"},

					/**
					 * If column was added to sorter this is true. If new sort is started this is set to false
					 */
					columnAdded : {type : "boolean"}
				}
			},

			/**
			 * fired when the table is filtered.
			 */
			filter : {allowPreventDefault : true,
				parameters : {

					/**
					 * filtered column.
					 */
					column : {type : "sap.ui.table.Column"},

					/**
					 * filter value.
					 */
					value : {type : "string"}
				}
			},

			/**
			 * fired when the table is grouped (experimental!).
			 */
			group : {allowPreventDefault : true,
				parameters : {
					/**
					 * grouped column.
					 */
					column : {type : "sap.ui.table.Column"}
				}
			},

			/**
			 * fired when the visibility of a table column is changed.
			 */
			columnVisibility : {allowPreventDefault : true,
				parameters : {

					/**
					 * affected column.
					 */
					column : {type : "sap.ui.table.Column"},

					/**
					 * new value of the visible property.
					 */
					visible : {type : "boolean"}
				}
			},

			/**
			 * fired when the user clicks a cell of the table (experimental!).
			 * @since 1.21.0
			 */
			cellClick : {allowPreventDefault : true,
				parameters : {
					/**
					 * The control of the cell.
					 */
					cellControl : {type : "sap.ui.core.Control"},

					/**
					 * DOM reference of the clicked cell. Can be used to position the context menu.
					 */
					cellDomRef : {type : "Object"},

					/**
					 * Row index of the selected cell.
					 */
					rowIndex : {type : "int"},

					/**
					 * Column index of the selected cell. This is the index of visible columns and might differ from
					 * the index maintained in the column aggregation.
					 */
					columnIndex : {type : "int"},

					/**
					 * Column ID of the selected cell.
					 */
					columnId : {type : "string"},

					/**
					 * Row binding context of the selected cell.
					 */
					rowBindingContext : {type : "sap.ui.model.Context"}
				}
			},

			/**
			 * fired when the user clicks a cell of the table.
			 * @since 1.21.0
			 */
			cellContextmenu : {allowPreventDefault : true,
				parameters : {
					/**
					 * The control of the cell.
					 */
					cellControl : {type : "sap.ui.core.Control"},

					/**
					 * DOM reference of the clicked cell. Can be used to position the context menu.
					 */
					cellDomRef : {type : "Object"},

					/**
					 * Row index of the selected cell.
					 */
					rowIndex : {type : "int"},

					/**
					 * Column index of the selected cell. This is the index of visible columns and might differ from
					 * the index maintained in the column aggregation.
					 */
					columnIndex : {type : "int"},

					/**
					 * Column ID of the selected cell.
					 */
					columnId : {type : "string"},

					/**
					 * Row binding context of the selected cell.
					 */
					rowBindingContext : {type : "sap.ui.model.Context"}
				}
			},

			/**
			 * fired when a column of the table should be freezed
			 * @since 1.21.0
			 */
			columnFreeze : {allowPreventDefault : true,
				parameters : {

					/**
					 * reference to the column to freeze
					 */
					column : {type : "sap.ui.table.Column"}
				}
			},

			/**
			 * This event is triggered when the custom filter item of the column menu is pressed. The column on which the event was triggered is passed as parameter.
			 * @since 1.23.0
			 */
			customFilter : {
				/**
				 * The column instance on which the custom filter button was pressed.
				 */
				column : {type : "sap.ui.table.Column"},

				/**
				 * Filter value.
				 */
				value : {type : "string"}
			},

			/**
			 * This event gets fired when the first visible row is changed. It should only be used by composite controls.
			 * The event even is fired when setFirstVisibleRow is called programmatically.
			 * @since 1.37.0
			 * @protected
			 */
			firstVisibleRowChanged : {
				/**
				 * First visible row
				 */
				firstVisibleRow : {type : "int"}
			},

			/**
			 * This event gets fired when the busy state of the table changes. It should only be used by composite controls.
			 * @since 1.37.0
			 * @protected
			 */
			busyStateChanged : {
				/**
				 * busy state
				 */
				busy : {type : "boolean"}
			}
		},
		designTime : true
	}});
































	// =============================================================================
	// BASIC CONTROL API
	// =============================================================================

	IconPool.insertFontFaceStyle();

	/**
	 * Initialization of the Table control
	 * @private
	 */
	Table.prototype.init = function() {
		this._iBaseFontSize = parseFloat(jQuery("body").css("font-size")) || 16;
		// create an information object which contains always required infos
		this._oResBundle = sap.ui.getCore().getLibraryResourceBundle("sap.ui.table");
		this._bRtlMode = sap.ui.getCore().getConfiguration().getRTL();
		this._oAccExtension = new TableAccExtension(this);
		this._bAccMode = this._oAccExtension.getAccMode();

		this._bBindingLengthChanged = false;
		this._mTimeouts = {};

		/**
		 * Updates the row binding contexts and synchronizes the row heights. This function will be called by updateRows
		 */
		this._lastCalledUpdateRows = 0;
		this._iBindingTimerDelay = 50;

		var that = this;

		this._performUpdateRows = function(sReason) {
			// update only if control not marked as destroyed (could happen because updateRows is called during destroying the table)
			if (!that.bIsDestroyed) {
				that._lastCalledUpdateRows = Date.now();
				that._updateBindingContexts(undefined, undefined, sReason);

				if (!that._bInvalid) {
					// subsequent DOM updates are only required if there is no rendering to be expected
					that._getAccExtension().updateAccForCurrentCell(false);
					that._updateSelection();
					that._updateGroupHeader();

					// for TreeTable and AnalyticalTable
					if (that._updateTableContent) {
						that._updateTableContent();
					}

					var oTableSizes = that._collectTableSizes();
					that._updateRowHeader(oTableSizes.tableRowHeights);
					that._syncColumnHeaders(oTableSizes);
					if (that._bBindingLengthChanged) {
						that._updateVSb(oTableSizes);
					}
				}

				that._mTimeouts.bindingTimer = undefined;
				// Helper event for testing
				that.fireEvent("_rowsUpdated");
			}

			that._bBindingLengthChanged = false;
		};

		// basic selection model (by default the table uses multi selection)
		this._initSelectionModel(sap.ui.model.SelectionModel.MULTI_SELECTION);

		// minimum width of a table column in pixel:
		// should at least be larger than the paddings for cols and cells!
		this._iColMinWidth = 20;
		if ('ontouchstart' in document) {
			this._iColMinWidth = 88;
		}

		this._oCalcColumnWidths = [];
		this._aTableHeaders = [];
		this._iLastHoveredColumnIndex = 0;

		// columns to cells map
		this._aIdxCols2Cells = [];

		// visible columns
		this._aVisibleColumns = [];

		// action mode flag (for keyboard navigation)
		this._bActionMode = false;

		// column index of the last fixed column (to prevent column reordering!)
		this._iLastFixedColIndex = -1;

		// flag whether the editable property should be inherited or not
		this._bInheritEditableToControls = false;

		// text selection for column headers?
		this._bAllowColumnHeaderTextSelection = false;

		this._doubleclickDelay = 300;
		this._clicksRegistered = 0;

		// determine whether jQuery version is less than 1.8 (height and width behaves different!!)
		this._bjQueryLess18 = jQuery.sap.Version(jQuery.fn.jquery).compareTo("1.8") < 0;
		this._iDataRequestedCounter = 0;

		this._iBindingLength = 0;
		this._iTableRowContentHeight = 0;
		this._bFirstRendering = true;

		// F6 Handling is done in TableRenderer to make sure the table content gets the focus. The
		// Toolbar has its own F6 stop.
		// this.data("sap-ui-fastnavgroup", "true", true); // Define group for F6 handling

		// determines whether item navigation should be reapplied from scratch
		this._bItemNavigationInvalidated = false;
		this._bInvalid = true;

		this._bIsScrollVertical = null;
	};


	/**
	 * Termination of the Table control
	 * @private
	 */
	Table.prototype.exit = function() {
		// destroy the child controls
		this._bExitCalled = true;

		if (this._oPaginator) {
			this._oPaginator.destroy();
		}

		this._oAccExtension.destroy();

		this._resetRowTemplate();

		// destroy helpers
		this._destroyItemNavigation();
		// cleanup
		this._cleanUpTimers();
		this._detachEvents();
	};

	Table.prototype._getAccExtension = function(){
		return this._oAccExtension;
	};

	Table.prototype._getAccRenderExtension = function(){
		return this._getAccExtension().getAccRenderExtension();
	};

	/**
	 * theme changed
	 * @private
	 */
	Table.prototype.onThemeChanged = function() {
		if (this.getDomRef()) {
			this.invalidate();
		}
	};

	/**
	 * Determines the row heights of the fixed and scroll area.
	 * @private
	 */
	Table.prototype._collectRowHeights = function() {
		var oDomRef = this.getDomRef();
		if (!oDomRef) {
			return [];
		}

		var aFixedRowItems = oDomRef.querySelectorAll(".sapUiTableCtrlFixed > tbody > tr");
		var aScrollRowItems = oDomRef.querySelectorAll(".sapUiTableCtrlScroll > tbody > tr");
		var aRowItemHeights = [];
		for (var i = 0; i < aScrollRowItems.length; i++) {
			var iFixedRowHeight = 0;
			if (aFixedRowItems[i]) {
				var oFixedRowClientRect = aFixedRowItems[i].getBoundingClientRect();
				iFixedRowHeight = oFixedRowClientRect.bottom - oFixedRowClientRect.top;
			}

			var oScrollRowClientRect = aScrollRowItems[i].getBoundingClientRect();
			var iRowHeight = oScrollRowClientRect.bottom - oScrollRowClientRect.top;

			aRowItemHeights.push(Math.max(iFixedRowHeight, iRowHeight));
		}

		return aRowItemHeights;
	};

	/**
	 * Resets the height style property of all TR elements of the table
	 * @private
	 */
	Table.prototype._resetRowHeights = function() {
		var iRowHeight = this.getRowHeight();

		var sRowHeight = "";
		if (iRowHeight) {
			sRowHeight = iRowHeight + "px";
		}

		var aRowItems = this.getDomRef().querySelectorAll(".sapUiTableCtrlFixed > tbody > tr, .sapUiTableCtrlScroll > tbody > tr");
		for (var i = 0; i < aRowItems.length; i++) {
			aRowItems[i].style.height = sRowHeight;
		}
	};

	/**
	 * Determines all needed table size at one dedicated point,
	 * for avoiding layout thrashing through read/write UI operations.
	 * @private
	 */
	Table.prototype._determineAvailableSpace = function() {
		var oDomRef = this.getDomRef();
		if (oDomRef && oDomRef.parentNode) {
			var oCCnt = oDomRef.querySelector(".sapUiTableCCnt");
			if (oCCnt) {
				var iUsedHeight = oDomRef.scrollHeight - oCCnt.clientHeight;
				return jQuery(oDomRef.parentNode).height() - iUsedHeight;
			}
		}
		return 0;
	};

	/**
	 * Determines all needed table size at one dedicated point,
	 * for avoiding layout thrashing through read/write UI operations.
	 * @private
	 */
	Table.prototype._collectTableSizes = function(aTableRowHeights) {
		var oSizes = {
			tableCtrlScrollWidth: 0,
			tableRowHdrScrWidth: 0,
			tableCtrlRowScrollTop: 0,
			tableCtrlRowScrollHeight: 0,
			tableCtrlScrWidth: 0,
			tableHSbScrollLeft: 0,
			tableCtrlFixedWidth: 0,
			columnRowHeight: 0,
			columnRowOuterHeight: 0,
			invisibleColWidth: 0
		};

		var oDomRef = this.getDomRef();
		if (!oDomRef) {
			return oSizes;
		}

		var oSapUiTableCtrlScroll = oDomRef.querySelector(".sapUiTableCtrlScroll");
		if (oSapUiTableCtrlScroll) {
			oSizes.tableCtrlScrollWidth = oSapUiTableCtrlScroll.clientWidth;
		}

		var oSapUiTableRowHdrScr = oDomRef.querySelector(".sapUiTableRowHdrScr");
		if (oSapUiTableRowHdrScr) {
			oSizes.tableRowHdrScrWidth = oSapUiTableRowHdrScr.clientWidth;
		}

		var oSapUiTableCtrlRowScroll = oDomRef.querySelector(".sapUiTableCtrl.sapUiTableCtrlRowScroll.sapUiTableCtrlScroll");
		if (oSapUiTableCtrlRowScroll) {
			oSizes.tableCtrlRowScrollTop = oSapUiTableCtrlRowScroll.offsetTop;
			oSizes.tableCtrlRowScrollHeight = oSapUiTableCtrlRowScroll.offsetHeight;
		}

		var oCtrlScrDomRef = oDomRef.querySelector(".sapUiTableCtrlScr");
		if (oCtrlScrDomRef) {
			oSizes.tableCtrlScrWidth = oCtrlScrDomRef.clientWidth;
		}

		var oHsb = this.getDomRef("hsb");
		if (oHsb) {
			oSizes.tableHSbScrollLeft = oHsb.scrollLeft;
		}

		var oCtrlFixed = oDomRef.querySelector(".sapUiTableCtrlFixed");
		if (oCtrlFixed) {
			oSizes.tableCtrlFixedWidth = oCtrlFixed.clientWidth;
		}

		var aHeaderWidths = [];
		var aHeaderElements = oDomRef.querySelectorAll(".sapUiTableCtrlFirstCol > th:not(.sapUiTableColSel)");
		if (aHeaderElements) {
			for (var i = 0; i < aHeaderElements.length; i++) {
				var oHeaderElementClientBoundingRect = aHeaderElements[i].getBoundingClientRect();
				aHeaderWidths.push(oHeaderElementClientBoundingRect.right - oHeaderElementClientBoundingRect.left);
			}
		}

		oSizes.headerWidths = aHeaderWidths;

		if (this.getSelectionMode() !== sap.ui.table.SelectionMode.None && this.getSelectionBehavior() !== sap.ui.table.SelectionBehavior.RowOnly) {
			var oFirstInvisibleColumn = oDomRef.querySelector(".sapUiTableCtrlFirstCol > th:first-child");
			if (oFirstInvisibleColumn) {
				oSizes.invisibleColWidth = oFirstInvisibleColumn.clientWidth;
			}
		}

		var oColumn = oDomRef.querySelector(".sapUiTableCol");
		if (oColumn) {
			oSizes.columnRowHeight = oColumn.clientHeight;
			oSizes.columnRowOuterHeight = oColumn.offsetHeight;
		}

		if (!aTableRowHeights) {
			oSizes.tableRowHeights = this._collectRowHeights();
		} else {
			oSizes.tableRowHeights = aTableRowHeights;
		}


		return oSizes;
	};

	/**
	 * Synchronizes the row heights with the row header heights.
	 * @private
	 */
	Table.prototype._updateRowHeader = function(aRowItemHeights) {
		var oDomRef = this.getDomRef();
		if (!oDomRef) {
			return;
		}
		var aRowHeaderItems = oDomRef.querySelectorAll(".sapUiTableRowHdr");

		var aFixedRowItems = oDomRef.querySelectorAll(".sapUiTableCtrlFixed > tbody > tr");
		var aScrollRowItems = oDomRef.querySelectorAll(".sapUiTableCtrlScroll > tbody > tr");

		var iLength = Math.max(aRowHeaderItems.length, aScrollRowItems.length, 0);
		for (var i = 0; i < iLength; i++) {
			var iRowItemHeight = aRowItemHeights[i];
			if (iRowItemHeight) {
				if (aRowHeaderItems[i]) {
					aRowHeaderItems[i].style.height = iRowItemHeight + "px";
				}

				if (aFixedRowItems[i]) {
					aFixedRowItems[i].style.height = iRowItemHeight + "px";
				}

				if (aScrollRowItems[i]) {
					aScrollRowItems[i].style.height = iRowItemHeight + "px";
				}
			}
		}
	};

	/**
	 * Rerendering handling
	 * @private
	 */
	Table.prototype.onBeforeRendering = function() {
		this._cleanUpTimers();
		this._detachEvents();

		var sVisibleRowCountMode = this.getVisibleRowCountMode();

		if (this._mTimeouts.bindingTimer) {
			jQuery.sap.clearDelayedCall(this._mTimeouts.bindingTimer);
		}

		if ((sVisibleRowCountMode == sap.ui.table.VisibleRowCountMode.Interactive) ||
			sVisibleRowCountMode == sap.ui.table.VisibleRowCountMode.Fixed ||
			(sVisibleRowCountMode == sap.ui.table.VisibleRowCountMode.Auto && this._iTableRowContentHeight && this.getRows().length == 0)) {
			if (this.getBinding("rows")) {
				this._adjustRows(this._calculateRowsToDisplay());
			} else {
				var that = this;
				this._mTimeouts.onBeforeRenderingAdjustRows = this._mTimeouts.onBeforeRenderingAdjustRows || window.setTimeout(function() {
						that._adjustRows(that._calculateRowsToDisplay());
						that._mTimeouts.onBeforeRenderingAdjustRows = undefined;
					}, 0);
			}
		}
	};

	/**
	 * Rerendering handling
	 * @private
	 */
	Table.prototype.onAfterRendering = function() {
		this._iDefaultRowHeight = undefined;
		this._bInvalid = false;
		this._bOnAfterRendering = true;
		var $this = this.$();

		this._renderOverlay();
		this._attachEvents();

		// since the row is an element it has no own renderer. Anyway, logically it has a domref. Let the rows
		// update their domrefs after the rendering is done. This is required to allow performant access to row domrefs
		this._initRowDomRefs();

		// restore the column icons
		var aCols = this.getColumns();
		for (var i = 0, l = aCols.length; i < l; i++) {
			if (aCols[i].getVisible()) {
				aCols[i]._restoreIcons();
			}
		}

		// enable/disable text selection for column headers
		if (!this._bAllowColumnHeaderTextSelection) {
			this._disableTextSelection($this.find(".sapUiTableColHdrCnt"));
		}

		this._bOnAfterRendering = false;

		// invalidate item navigation
		this._bItemNavigationInvalidated = true;

		if (this._bFirstRendering && this.getVisibleRowCountMode() == sap.ui.table.VisibleRowCountMode.Auto) {
			this._bFirstRendering = false;
			// Wait until everything is rendered (parent height!) before reading/updating sizes. Use a promise to make sure
			// to be executed before timeouts may be executed.
			Promise.resolve().then(this._updateTableSizes.bind(this, true));
		} else if (!this._mTimeouts.onAfterRenderingUpdateTableSizes) {
			this._updateTableSizes();
		}

		this._updateGroupHeader();

		// for TreeTable and AnalyticalTable
		if (this._updateTableContent) {
			this._updateTableContent();
		}

		if (this.getBinding("rows")) {
			this.fireEvent("_rowsUpdated");
		}
	};

	Table.prototype.invalidate = function() {
		if (!this._ignoreInvalidateOfChildControls) {
			this._bInvalid = true;
			var vReturn = Control.prototype.invalidate.call(this);
		}

		return vReturn;
	};

	Table.prototype._initRowDomRefs = function() {
		var aRows = this.getRows();
		for (var i = 0; i < aRows.length; i++) {
			aRows[i].initDomRefs();
		}
	};

		/**
	 * First collects all table sizes, then synchronizes row/column heights, updates scrollbars and selection.
	 * @private
	 */
	Table.prototype._updateTableSizes = function(forceUpdateTableSizes) {
		this._mTimeouts.onAfterRenderingUpdateTableSizes = undefined;
		var oDomRef = this.getDomRef();

		if (this._bInvalid || !oDomRef) {
			return;
		}

		this._resetRowHeights();
		var aRowHeights = this._collectRowHeights();
		this._getDefaultRowHeight(aRowHeights);

		var iRowContentSpace = 0;
		if (this.getVisibleRowCountMode() == sap.ui.table.VisibleRowCountMode.Auto) {
			iRowContentSpace = this._determineAvailableSpace();
			// if no height is granted we do not need to do any further row adjustment or layout sync.
			// Saves time on initial start up and reduces flickering on rendering.
			if (this._handleRowCountModeAuto(iRowContentSpace) && !forceUpdateTableSizes) {
				// updateTableSizes was already called by insertTableRows, therefore skip the rest of this function execution
				return;
			}
		}

		if (this._sResizeHandlerId) {
			ResizeHandler.deregister(this._sResizeHandlerId);
			this._sResizeHandlerId = undefined;
		}

		// update Vertical Scrollbar before collection because it changes sizes
		this._toggleVSb();

		var oTableSizes = this._collectTableSizes(aRowHeights);

		var that = this;

		// Manipulation of UI Sizes
		this._updateRowHeader(oTableSizes.tableRowHeights);
		this._syncColumnHeaders(oTableSizes);
		this._determineVisibleCols(oTableSizes);
		this._setRowContentHeight(iRowContentSpace);
		this._updateHSb(oTableSizes);
		this._updateVSb(oTableSizes);

		this.$().find(".sapUiTableNoOpacity").addBack().removeClass("sapUiTableNoOpacity");

		if (this._mTimeouts.afterUpdateTableSizes) {
			window.clearTimeout(this._mTimeouts.afterUpdateTableSizes);
		}
		this._mTimeouts.afterUpdateTableSizes = window.setTimeout(function() {
			if (that._sResizeHandlerId) {
				ResizeHandler.deregister(that._sResizeHandlerId);
				that._sResizeHandlerId = undefined;
			}

			if (oDomRef && oDomRef.parentNode) {
				that._sResizeHandlerId = ResizeHandler.register(oDomRef.parentNode, that._onTableResize.bind(that));
			}
		}, 0);
	};

	/**
	 * Render overlay div
	 * @private
	 */
	Table.prototype._renderOverlay = function() {
		var $this = this.$(),
		    $overlay = $this.find(".sapUiTableOverlay"),
		    bShowOverlay = this.getShowOverlay();
		if (bShowOverlay && $overlay.length === 0) {
			$overlay = jQuery("<div>").addClass("sapUiOverlay sapUiTableOverlay").css("z-index", "1");
			$this.append($overlay);
		} else if (!bShowOverlay) {
			$overlay.remove();
		}
	};

	Table.prototype.setShowOverlay = function(bShow) {
		this.setProperty("showOverlay", bShow, true);
		this._renderOverlay();
		return this;
	};

	/**
	 * update the table content (scrollbar, no data overlay, selection, row header, ...)
	 * @private
	 */
	Table.prototype._updateGroupHeader = function() {
		var that = this;
		// update the rows (TODO: generalize this for 1.6)
		if (this._modifyRow) {
			jQuery.each(this.getRows(), function(iIndex, oRow) {
				that._modifyRow(iIndex + that.getFirstVisibleRow(), oRow.$());
				that._modifyRow(iIndex + that.getFirstVisibleRow(), oRow.$("fixed"));
			});
		}
	};

	Table.prototype._updateFixedBottomRows = function() {
		var iFixedBottomRows = this.getFixedBottomRowCount();

		var oDomRef = this.getDomRef();
		if (oDomRef && iFixedBottomRows > 0) {
			var $sapUiTableFixedPreBottomRow = jQuery(oDomRef).find(".sapUiTableFixedPreBottomRow");
			$sapUiTableFixedPreBottomRow.removeClass("sapUiTableFixedPreBottomRow");

			var oBinding = this.getBinding("rows");

			if (oBinding) {
				var iVisibleRowCount = this.getVisibleRowCount();
				var bIsPreBottomRow = false;
				var aRows = this.getRows();
				var iFirstVisibleRow = this._getSanitizedFirstVisibleRow();
				for (var i = 0; i < aRows.length; i++) {
					var $rowDomRefs = aRows[i].getDomRefs(true);
					if (this._iBindingLength >= iVisibleRowCount) {
						bIsPreBottomRow = (i == iVisibleRowCount - iFixedBottomRows - 1);
					} else {
						bIsPreBottomRow = (iFirstVisibleRow + i) == (this._iBindingLength - iFixedBottomRows - 1) && (iFirstVisibleRow + i) < this._iBindingLength;
					}

					$rowDomRefs.row.toggleClass("sapUiTableFixedPreBottomRow", bIsPreBottomRow);
				}
			}
		}
	};


	// =============================================================================
	// ITEMNAVIGATION
	// =============================================================================


	/**
	 * initialize ItemNavigation. Transfer relevant controls to ItemNavigation.
	 * TabIndexes are set by ItemNavigation
	 * @private
	*/
	Table.prototype._initItemNavigation = function() {

		var $this = this.$();
		var iColumnCount = this._getVisibleColumnCount();
		var iTotalColumnCount = iColumnCount;
		var bHasRowHeader = this.getSelectionMode() !== sap.ui.table.SelectionMode.None && this.getSelectionBehavior() !== sap.ui.table.SelectionBehavior.RowOnly;

		// initialization of item navigation for the Column Headers
		if (!this._oColHdrItemNav) {
			this._oColHdrItemNav = new ItemNavigation();
			this._oColHdrItemNav.setCycling(false);
			this.addDelegate(this._oColHdrItemNav);
		}

		// create the list of item dom refs
		var aItemDomRefs = [];
		if (this.getFixedColumnCount() == 0) {
			aItemDomRefs = $this.find(".sapUiTableCtrl td[tabindex]").get();
		} else {
			var $topLeft = this.$().find('.sapUiTableCtrlFixed.sapUiTableCtrlRowFixed');
			var $topRight = this.$().find('.sapUiTableCtrlScroll.sapUiTableCtrlRowFixed');
			var $middleLeft = this.$().find('.sapUiTableCtrlFixed.sapUiTableCtrlRowScroll');
			var $middleRight = this.$().find('.sapUiTableCtrlScroll.sapUiTableCtrlRowScroll');
			var $bottomLeft = this.$().find('.sapUiTableCtrlFixed.sapUiTableCtrlRowFixedBottom');
			var $bottomRight = this.$().find('.sapUiTableCtrlScroll.sapUiTableCtrlRowFixedBottom');
			for (var i = 0; i < this.getVisibleRowCount(); i++) {
				aItemDomRefs = aItemDomRefs.concat($topLeft.find('tr[data-sap-ui-rowindex="' + i + '"]').find('td[tabindex]').get());
				aItemDomRefs = aItemDomRefs.concat($topRight.find('tr[data-sap-ui-rowindex="' + i + '"]').find('td[tabindex]').get());
				aItemDomRefs = aItemDomRefs.concat($middleLeft.find('tr[data-sap-ui-rowindex="' + i + '"]').find('td[tabindex]').get());
				aItemDomRefs = aItemDomRefs.concat($middleRight.find('tr[data-sap-ui-rowindex="' + i + '"]').find('td[tabindex]').get());
				aItemDomRefs = aItemDomRefs.concat($bottomLeft.find('tr[data-sap-ui-rowindex="' + i + '"]').find('td[tabindex]').get());
				aItemDomRefs = aItemDomRefs.concat($bottomRight.find('tr[data-sap-ui-rowindex="' + i + '"]').find('td[tabindex]').get());
			}
		}

		// to later determine the position of the first TD in the aItemDomRefs we keep the
		// count of TDs => aCount - TDs = first TD (add the row headers to the TD count / except the first one!)
		var iTDCount = aItemDomRefs.length;
		var iInitialIndex = 0;

		// add the row header items (if visible)
		if (bHasRowHeader) {
			var aRowHdrDomRefs = $this.find(".sapUiTableRowHdr").get();
			for (var i = aRowHdrDomRefs.length - 1; i >= 0; i--) {
				aItemDomRefs.splice(i * iColumnCount, 0, aRowHdrDomRefs[i]);
				// we ignore the row headers
				iTDCount++;
			}
			// except the first row header
			iTDCount--;
			// add the row header to the column count
			iTotalColumnCount++;
			iInitialIndex = 1;
		}

		// add the column items
		if (this.getColumnHeaderVisible()) {
			aItemDomRefs = $this.find(".sapUiTableCol").get().concat(aItemDomRefs);
		}

		// add the select all item
		if (bHasRowHeader && this.getColumnHeaderVisible()) {
			var aRowHdr = $this.find(".sapUiTableColRowHdr").get();
			for (var i = this._getHeaderRowCount() - 1; i >= 0; i--) {
				aItemDomRefs.splice(i * iColumnCount, 0, aRowHdr[0]);
			}
		}

		// initialization of item navigation for the Table control
		if (!this._oItemNavigation) {
			this._iLastSelectedDataRow = this._getHeaderRowCount();
			this._oItemNavigation = new ItemNavigation();
			this._oItemNavigation.setTableMode(true);
			this._oItemNavigation.attachEvent(ItemNavigation.Events.AfterFocus, function(oEvent) {
				var iRow = Math.floor(oEvent.getParameter("index") / this._oItemNavigation.iColumns);
				if (iRow > 0) {
					this._iLastSelectedDataRow = iRow;
				}
			}, this);
			this.addDelegate(this._oItemNavigation);
		}


		// configure the item navigation
		this._oItemNavigation.setColumns(iTotalColumnCount);
		this._oItemNavigation.setRootDomRef($this.find(".sapUiTableCnt").get(0));
		this._oItemNavigation.setItemDomRefs(aItemDomRefs);
		this._oItemNavigation.setFocusedIndex(iInitialIndex);

		// revert invalidation flag
		this._bItemNavigationInvalidated = false;
	};

	/**
	 * destroys ItemNavigation
	 * @private
	*/
	Table.prototype._destroyItemNavigation = function() {

		// destroy of item navigation for the Table control
		if (this._oItemNavigation) {
			this.removeDelegate(this._oItemNavigation);
			this._oItemNavigation.destroy();
			this._oItemNavigation = null;
		}

	};


	/*
	 * @see JSDoc generated by SAPUI5 control
	 */
	Table.prototype.getFocusInfo = function() {
		var sId = this.$().find(":focus").attr("id");
		if (sId) {
			return {customId: sId};
		} else {
			return sap.ui.core.Element.prototype.getFocusInfo.apply(this, arguments);
		}
	};

	/*
	 * @see JSDoc generated by SAPUI5 control
	 */
	Table.prototype.applyFocusInfo = function(mFocusInfo) {
		if (mFocusInfo && mFocusInfo.customId) {
			this.$().find("#" + mFocusInfo.customId).focus();
		} else {
			sap.ui.core.Element.prototype.getFocusInfo.apply(this, arguments);
		}
		return this;
	};


	// =============================================================================
	// PUBLIC TABLE API
	// =============================================================================


	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.setTitle = function(vTitle) {
		var oTitle = vTitle;
		if (typeof (vTitle) === "string" || vTitle instanceof String) {
			oTitle = sap.ui.table.TableHelper.createTextView({
				text: vTitle,
				width: "100%"
			});
			oTitle.addStyleClass("sapUiTableHdrTitle");
		}
		this.setAggregation("title", oTitle);
		return this;
	};


	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.setFooter = function(vFooter) {
		var oFooter = vFooter;
		if (typeof (vFooter) === "string" || vFooter instanceof String) {
			oFooter = sap.ui.table.TableHelper.createTextView({
				text: vFooter,
				width: "100%"
			});
		}
		this.setAggregation("footer", oFooter);
		return this;
	};


	/**
	 * Sets the selection mode. The current selection is lost.
	 * @param {string} sSelectionMode the selection mode, see sap.ui.table.SelectionMode
	 * @public
	 * @return a reference on the table for chaining
	 */
	Table.prototype.setSelectionMode = function(sSelectionMode) {
		this.clearSelection();
		if (sSelectionMode === sap.ui.table.SelectionMode.Single) {
			this._oSelection.setSelectionMode(SelectionModel.SINGLE_SELECTION);
		} else {
			this._oSelection.setSelectionMode(SelectionModel.MULTI_SELECTION);
		}

		this.setProperty("selectionMode", sSelectionMode);
		return this;
	};


	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.setFirstVisibleRow = function(iRowIndex, bOnScroll, bSupressEvent) {
		var bFirstVisibleRowChanged = this.getFirstVisibleRow() != iRowIndex;

		this.setProperty("firstVisibleRow", iRowIndex, true);
		// update the bindings:
		//  - prevent the rerendering
		//  - use the databinding fwk to update the content of the rows
		if (bFirstVisibleRowChanged && this.getBinding("rows") && !this._bRefreshing) {
			this.updateRows();
			if (!bOnScroll) {
				var oVSb = this.getDomRef("vsb");
				if (oVSb) {
					oVSb.scrollTop = iRowIndex * (this._getDefaultRowHeight() || 28);
				}
			}
		}

		this._getAccExtension().updateAccForCurrentCell(false);

		if (bFirstVisibleRowChanged && !bSupressEvent) {
			this.fireFirstVisibleRowChanged({firstVisibleRow: iRowIndex});
		}
		return this;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.getAllowColumnReordering = function() {
		jQuery.sap.log.warning("getAllowColumnReordering is deprecated - please use getEnableColumnReordering!");
		return Table.prototype.getEnableColumnReordering.apply(this, arguments);
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.setAllowColumnReordering = function() {
		jQuery.sap.log.warning("setAllowColumnReordering is deprecated - please use setEnableColumnReordering!");
		return Table.prototype.setEnableColumnReordering.apply(this, arguments);
	};


	// enable calling 'bindAggregation("rows")' without a factory
	Table.getMetadata().getAggregation("rows")._doesNotRequireFactory = true;

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.bindRows = function(oBindingInfo, vTemplate, oSorter, aFilters) {
		// ensure old Table API compatibility (sPath, [oSorter], [aFilters])
		if (typeof oBindingInfo === "string" &&
			  (vTemplate instanceof sap.ui.model.Sorter || jQuery.isArray(oSorter) && oSorter[0] instanceof sap.ui.model.Filter) ) {
			aFilters = oSorter;
			oSorter = vTemplate;
			vTemplate = undefined;
		}

		return this.bindAggregation("rows", oBindingInfo, vTemplate, oSorter, aFilters);
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype._bindAggregation = function(sName, sPath, oTemplate, oSorter, aFilters) {
		sap.ui.core.Element.prototype._bindAggregation.apply(this, arguments);
		var oBinding = this.getBinding("rows");
		if (sName === "rows" && oBinding) {
			oBinding.attachChange(this._onBindingChange, this);
		}

		// re-initialize the selection model, might be necessary in case the table gets "rebound"
		this._initSelectionModel(sap.ui.model.SelectionModel.MULTI_SELECTION);

		// currently only required for TreeBindings, will be relevant for ListBindings later
		if (oBinding && this.isTreeBinding("rows") && !oBinding.hasListeners("selectionChanged")) {
			oBinding.attachSelectionChanged(this._onSelectionChanged, this);
		}
		return this;
	};

	/**
	 * Initialises a new selection model for the Table instance.
	 * @param {sap.ui.model.SelectionModel.MULTI_SELECTION|sap.ui.model.SelectionModel.SINGLE_SELECTION} sSelectionMode the selection mode of the selection model
	 * @return {sap.ui.table.Table} the table instance for chaining
	 * @private
	 */
	Table.prototype._initSelectionModel = function (sSelectionMode) {
		// detach old selection model event handler
		if (this._oSelection) {
			this._oSelection.detachSelectionChanged(this._onSelectionChanged, this);
		}
		//new selection model with the currently set selection mode
		this._oSelection = new sap.ui.model.SelectionModel(sSelectionMode);
		this._oSelection.attachSelectionChanged(this._onSelectionChanged, this);

		return this;
	};

	/**
	 * handler for change events of the binding
	 * @param {sap.ui.base.Event} oEvent change event
	 * @private
	 */
	Table.prototype._onBindingChange = function(oEvent) {
		var sReason = typeof (oEvent) === "object" ? oEvent.getParameter("reason") : oEvent;
		if (sReason === "sort" || sReason === "filter") {
			this.clearSelection();
			this.setFirstVisibleRow(0);
		}
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.unbindAggregation = function(sName, bSuppressReset) {
		var oBinding = this.getBinding("rows");
		if (sName === "rows" && this.isBound("rows")) {
			bSuppressReset = true;
		}

		var vReturn = sap.ui.core.Element.prototype.unbindAggregation.apply(this, [sName, bSuppressReset]);

		if (sName === "rows" && oBinding) {
			//Reset needs to be resetted, else destroyRows is called, which is not allowed to be called
			this._restoreAppDefaultsColumnHeaderSortFilter();
			// metadata might have changed
			this._invalidateColumnMenus();
			this._updateBindingLength();
			this.updateRows("unbindAggregation");
		}

		return vReturn;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.setVisibleRowCount = function(iVisibleRowCount) {
		if (iVisibleRowCount != null && !isFinite(iVisibleRowCount)) {
			return this;
		}

		var sVisibleRowCountMode = this.getVisibleRowCountMode();
		if (sVisibleRowCountMode == sap.ui.table.VisibleRowCountMode.Auto) {
			jQuery.sap.log.error("VisibleRowCount will be ignored since VisibleRowCountMode is set to Auto", this);
			return this;
		}

		var iFixedRowsCount = this.getFixedRowCount() + this.getFixedBottomRowCount();
		if (iVisibleRowCount <= iFixedRowsCount && iFixedRowsCount > 0) {
			jQuery.sap.log.error("Table: " + this.getId() + " visibleRowCount('" + iVisibleRowCount + "') must be bigger than number of fixed rows('" + (this.getFixedRowCount() + this.getFixedBottomRowCount()) + "')", this);
			return this;
		}

		iVisibleRowCount = this.validateProperty("visibleRowCount", iVisibleRowCount);
		if (this.getBinding("rows") && this.getBinding("rows").getLength() <= iVisibleRowCount) {
			this.setProperty("firstVisibleRow", 0);
		}
		this.setProperty("visibleRowCount", iVisibleRowCount);
		this._setRowContentHeight(iVisibleRowCount * this._getDefaultRowHeight());
		return this;
	};

	/**
	 * Sets a new tooltip for this object. The tooltip can either be a simple string
	 * (which in most cases will be rendered as the <code>title</code> attribute of this
	 * Element) or an instance of {@link sap.ui.core.TooltipBase}.
	 *
	 * If a new tooltip is set, any previously set tooltip is deactivated.
	 *
	 * Please note that tooltips are not rendered for the table. The tooltip property will be set
	 * but it won't effect the DOM.
	 *
	 * @param {string|sap.ui.core.TooltipBase} vTooltip
	 * @returns {sap.ui.table.Table} This-reference for chaining
	 * @public
	 * @override
	 */
	Table.prototype.setTooltip = function(vTooltip) {
		jQuery.sap.log.warning("The aggregation tooltip is not supported for sap.ui.table.Table");
		return this.setAggregation("tooltip", vTooltip, true);
	};

	/**
	 * Requests fixed bottom row contexts from the binding.
	 * @returns {sap.ui.model.Context[]} Array of fixed bottom row context
	 * @private
	 */
	Table.prototype._getFixedBottomRowContexts = function (iFixedBottomRowCount, iBindingLength) {
		var oBinding = this.getBinding("rows");
		var aContexts = [];
		if (!oBinding) {
			return aContexts;
		}

		iFixedBottomRowCount = iFixedBottomRowCount || this.getFixedBottomRowCount();
		iBindingLength = iBindingLength || oBinding.getLength();

		var iVisibleRowCount = this.getVisibleRowCount();
		if (iFixedBottomRowCount > 0 && (iVisibleRowCount - iFixedBottomRowCount) < iBindingLength) {
			aContexts = this._getContexts(iBindingLength - iFixedBottomRowCount, iFixedBottomRowCount, 1);
		}

		return aContexts;
	};

	/**
	 * Requests fixed top row contexts from the binding.
	 * @returns {sap.ui.model.Context[]} Array of fixed top row context
	 * @private
	 */
	Table.prototype._getFixedRowContexts = function(iFixedRowCount) {
		iFixedRowCount = iFixedRowCount || this.getFixedRowCount();
		if (iFixedRowCount > 0) {
			return this._getContexts(0, iFixedRowCount);
		} else {
			return [];
		}
	};

	Table.prototype._getContexts = function(iStartIndex, iLength, iThreshold) {
		var oBinding = this.getBinding("rows");
		if (oBinding) {
			return oBinding.getContexts(iStartIndex, iLength, iThreshold);
		} else {
			return [];
		}
	};

	/**
	 * Requests all required contexts for visibleRowCount from the binding
	 * @returns {sap.ui.model.Context[]} Array of row contexts
	 * @private
	 */
	Table.prototype._getRowContexts = function (iVisibleRows, bSkipSecondCall, sReason) {
		var bRecievedLessThanRequested = false;
		var aContexts = [];
		var oBinding = this.getBinding("rows");
		var iVisibleRowCount = iVisibleRows || this.getRows().length;
		if (!oBinding || iVisibleRowCount <= 0) {
			// without binding there are no contexts to be retrieved
			return [];
		}

		var iFirstVisibleRow = this.getFirstVisibleRow();

		var iFixedRowCount = this.getFixedRowCount();
		var iFixedBottomRowCount = this.getFixedBottomRowCount();
		var iReceivedLength = 0;
		var aTmpContexts;

		// because of the analytical table the fixed bottom row must always be requested separately as it is the grand
		// total row for the table.
		var iLength = iVisibleRowCount - iFixedBottomRowCount;
		var iMergeOffsetScrollRows = 0;
		var iMergeOffsetBottomRow = iLength;

		// if the threshold is not explicitly disabled by setting it to 0,
		// the default threshold should be at the the visibleRowCount.
		var iThreshold = this.getThreshold();
		iThreshold = iThreshold ? Math.max(iVisibleRowCount, iThreshold) : 0;

		// data can be requested with a single getContexts call if the fixed rows and the scrollable rows overlap.
		var iStartIndex = iFirstVisibleRow;

		var fnMergeArrays = function (aTarget, aSource, iStartIndex) {
			for (var i = 0; i < aSource.length; i++) {
				aTarget[iStartIndex + i] = aSource[i];
			}
		};

		if (iFixedRowCount > 0 && iFirstVisibleRow > 0) {
			// since there is a gap between first visible row and fixed rows it must be requested separately
			// the first visible row always starts counting with 0 in the scroll part of the table no matter
			// how many fixed rows there are.
			iStartIndex = iFirstVisibleRow + iFixedRowCount;
			// length must be reduced by number of fixed rows since they were just requested separately
			iLength -= iFixedRowCount;
			iMergeOffsetScrollRows = iFixedRowCount;
			// retrieve fixed rows separately
			aTmpContexts = this._getFixedRowContexts(iFixedRowCount);
			iReceivedLength += aTmpContexts.length;
			aContexts = aContexts.concat(aTmpContexts);
		}

		// request scroll part contexts but may include fixed rows depending on scroll and length settings
		// if this is done before requesting fixed bottom rows, it saves some performance for the analytical table
		// since the tree gets only build once (as result of getContexts call). If first the fixed bottom row would
		// be requested the analytical binding would build the tree twice.
		aTmpContexts = this._getContexts(iStartIndex, iLength, iThreshold);
		var iBindingLength = this._updateBindingLength(sReason);
		// iLength is the number of rows which shall get filled. It might be more than the binding actually has data.
		// Therefore Math.min is required to make sure to not request data again from the binding.
		bRecievedLessThanRequested = aTmpContexts.length < Math.min(iLength, iBindingLength - iFixedBottomRowCount);

		// if a paginator is used as navigation mode there may be a gap between the fixed bottom rows and the scrollable
		// rows of the table. This must be considered when requesting contexts to make sure the fixed bottom row contexts
		// are not requested twice. For scroll scenarios however it's not applicable and will brake when using TreeBindings
		// as the TreeBindingAdapters rely on larger getContexts calls in order to fully build up the tree structure
		if (this.getNavigationMode === sap.ui.table.NavigationMode.Paginator) {

			// only relevant for the very last page
			var iAdjustedLength = Math.min(iLength, (Math.max(iBindingLength - iFirstVisibleRow - iFixedBottomRowCount, 0)));

			if (iAdjustedLength < iLength) {
				iLength = iAdjustedLength;
				aTmpContexts = aTmpContexts.slice(0, iLength);
			}
		}

		// get the binding length after getContext call to make sure that for TreeBindings the client tree was correctly rebuilt
		// this step can be moved to an earlier point when the TreeBindingAdapters all implement tree invalidation in case of getLength calls
		iReceivedLength += aTmpContexts.length;
		fnMergeArrays(aContexts, aTmpContexts, iMergeOffsetScrollRows);

		// request binding length after getContexts call to make sure that in case of tree binding and analytical binding
		// the tree gets only built once (by getContexts call).
		iMergeOffsetBottomRow = Math.min(iMergeOffsetBottomRow, Math.max(iBindingLength - iFixedBottomRowCount, 0));
		if (iFixedBottomRowCount > 0) {
			// retrieve fixed bottom rows separately
			// instead of just concatenating them to the existing contexts it must be made sure that they are put
			// to the correct row index otherwise they would flip into the scroll area in case data gets requested for
			// the scroll part.
			aTmpContexts = this._getFixedBottomRowContexts(iFixedBottomRowCount, iBindingLength);
			iReceivedLength += aTmpContexts.length;
			fnMergeArrays(aContexts, aTmpContexts, iMergeOffsetBottomRow);
		}

		if (bRecievedLessThanRequested && !bSkipSecondCall) {
			// check of binding length required
			var iFirstVisibleRowSanitized = this._getSanitizedFirstVisibleRow(true);
			if (iFirstVisibleRow != iFirstVisibleRowSanitized) {
				// get contexts again, this time with adjusted scroll position
				aContexts = this._getRowContexts(iVisibleRowCount, true);
				iReceivedLength = aContexts.length;
			}
		}

		if (!bSkipSecondCall) {
			var that = this;
			if (this._mTimeouts.getContextsSetBusy) {
				window.clearTimeout(this._mTimeouts.getContextsSetBusy);
			}
			this._mTimeouts.getContextsSetBusy = window.setTimeout(function() {
				that._setBusy({
					requestedLength: iFixedRowCount + iLength + iFixedBottomRowCount,
					receivedLength: iReceivedLength,
					contexts: aContexts,
					reason: sReason});
			}, 0);
		}

		return aContexts;
	};

	Table.prototype._getSanitizedFirstVisibleRow = function(bUpdate) {
		var sNavigationMode = this.getNavigationMode();
		var iVisibleRowCount = this.getVisibleRowCount();
		var iFirstVisibleRow = this.getFirstVisibleRow();
		// calculate the boundaries (at least 0 - max the row count - visible row count)
		iFirstVisibleRow = Math.max(iFirstVisibleRow, 0);
		if (sNavigationMode === sap.ui.table.NavigationMode.Scrollbar && this._iBindingLength > 0) {
			iFirstVisibleRow = Math.min(iFirstVisibleRow, Math.max(this._iBindingLength - iVisibleRowCount, 0));
		} else if (sNavigationMode === sap.ui.table.NavigationMode.Paginator && this._oPaginator) {
			var iNewPage = 1;
			if (iFirstVisibleRow < this._iBindingLength) {
				iNewPage = Math.ceil((iFirstVisibleRow + 1) / iVisibleRowCount);
			}
			if (iNewPage !== this._oPaginator.getCurrentPage()) {
				iFirstVisibleRow = (iNewPage - 1) * iVisibleRowCount;
				if (bUpdate) {
					this._oPaginator.setCurrentPage(iNewPage);
					if (this._oPaginator.getDomRef()) {
						this._oPaginator.rerender();
					}
				}
			}
		}

		if (bUpdate) {
			this.setProperty("firstVisibleRow", iFirstVisibleRow, true);
		}

		return iFirstVisibleRow;
	};

	Table.prototype._updateBindingLength = function(sReason) {
		// get current binding length. If the binding length changes it must call updateAggregation (updateRows)
		// therefore it should be save to buffer the binding lenght here. This gives some performance advantage
		// especially for tree bindings using the TreeBindingAdapter where a tree structure must be created to
		// calculate the correct length.
		var oBinding = this.getBinding("rows");
		var iBindingLength = 0;
		if (oBinding) {
			iBindingLength = oBinding.getLength();
		}

		if (iBindingLength != this._iBindingLength) {
			this._iBindingLength = iBindingLength;
			this._onBindingLengthChange(sReason);
		}

		return iBindingLength;
	};

	Table.prototype._onBindingLengthChange = function(sReason) {
		// update visualization of fixed bottom row
		this._updateFixedBottomRows();
		this._toggleVSb();
		this._bBindingLengthChanged = true;
		// show or hide the no data container
		if (sReason != "skipNoDataUpdate") {
			// in order to have less UI updates, the NoData text should not be updated when the reason is refresh. When
			// refreshRows was called, the table will request data and later get another change event. In that turn, the
			// noData text gets updated.
			this._updateNoData();
		}
	};

	/**
	 * refresh rows
	 * @private
	 */
	Table.prototype.refreshRows = function(vEvent) {
		var that = this;
		var sReason = typeof (vEvent) === "object" ? vEvent.getParameter("reason") : vEvent;
		if (sReason == sap.ui.model.ChangeReason.Refresh) {
			this._attachBindingListener();
		}
		this._bBusyIndicatorAllowed = true;
		// make getContexts call to force data load
		var sVisibleRowCountMode = this.getVisibleRowCountMode();
		if ((this.bOutput && sVisibleRowCountMode === sap.ui.table.VisibleRowCountMode.Auto) || sVisibleRowCountMode !== sap.ui.table.VisibleRowCountMode.Auto) {
			// the correct number of records to be requested can only be determined when the table row content height is known or if the
			// visible row count mode is not Auto
			var iRowsToDisplay = this._calculateRowsToDisplay();
			if (this.bOutput) {
				this.getBinding("rows").attachEventOnce("dataRequested", function() {
					// doing it in a timeout will allow the data request to be sent before the rows get created
					if (that._mTimeouts.refreshRowsAdjustRows) {
						window.clearTimeout(that._mTimeouts.refreshRowsAdjustRows);
					}
					that._mTimeouts.refreshRowsAdjustRows = window.setTimeout(function() {
						that._adjustRows(iRowsToDisplay, true);
					}, 0);
				});
			}
			// request contexts from binding
			var sUpdateReason;
			if (sReason == ChangeReason.Filter || sReason == ChangeReason.Sort) {
				sUpdateReason = "skipNoDataUpdate";
			}
			this._updateBindingContexts(true, iRowsToDisplay, sUpdateReason);
		}
	};

	/**
	 * updates the rows - called internally by the updateAggregation function when
	 * anything in the model has been changed.
	 * @private
	 */
	Table.prototype.updateRows = function(sReason) {
		if (this._bExitCalled) {
			return;
		}

		// update busy indicator state
		this._setBusy(sReason ? {changeReason: sReason} : false);

		// Rows should only be created/cloned when the number of rows can be determined. For the VisibleRowCountMode: Auto
		// this can only happen after the table control was rendered one. At this point in time we know how much space is
		// consumed by the table header, toolbar, footer... and we can calculate how much space is left for the table rows.
		var sVisibleRowCountMode = this.getVisibleRowCountMode();
		if ((this.getRows().length <= 0 || !this._oRowTemplate) && ((sVisibleRowCountMode == sap.ui.table.VisibleRowCountMode.Auto && this.bOutput) || sVisibleRowCountMode != sap.ui.table.VisibleRowCountMode.Auto)) {
			if (this._iTableRowContentHeight) {
				this._adjustRows(this._calculateRowsToDisplay());
			}
		}

		// when not scrolling we update also the scroll position of the scrollbar
		//if (this._oVSb.getScrollPosition() !== iStartIndex) {
			// TODO
			//this._updateAriaRowOfRowsText(true);
		//}

		// update the bindings only once the table is rendered
		if (this.bOutput) {
			// update the bindings by using a delayed mechanism to avoid to many update
			// requests: by using the mechanism below it will trigger an update each 50ms
			// except if the reason is coming from the binding with reason "change" then
			// we do an immediate update instead of a delayed one

			var iBindingTimerDelay = (sReason == ChangeReason.Change || (!this._mTimeouts.bindingTimer && Date.now() - this._lastCalledUpdateRows > this._iBindingTimerDelay) || sReason == "unbindAggregation" ? 0 : this._iBindingTimerDelay);
			var that = this;
			if (iBindingTimerDelay == 0 && sReason) {
				Promise.resolve().then(function() {
					that._performUpdateRows(sReason);
				});
			} else {
				this._mTimeouts.bindingTimer = this._mTimeouts.bindingTimer || window.setTimeout(function() {
						that._performUpdateRows(sReason);
					}, iBindingTimerDelay);
			}
		}
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.insertRow = function() {
		jQuery.sap.log.error("The control manages the rows aggregation. The method \"insertRow\" cannot be used programmatically!", this);
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.addRow = function() {
		jQuery.sap.log.error("The control manages the rows aggregation. The method \"addRow\" cannot be used programmatically!", this);
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.removeRow = function() {
		jQuery.sap.log.error("The control manages the rows aggregation. The method \"removeRow\" cannot be used programmatically!", this);
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.removeAllRows = function() {
		jQuery.sap.log.error("The control manages the rows aggregation. The method \"removeAllRows\" cannot be used programmatically!", this);
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.destroyRows = function() {
		jQuery.sap.log.error("The control manages the rows aggregation. The method \"destroyRows\" cannot be used programmatically!", this);
	};

	/**
	 * triggers automatic resizing of a column to the widest content.(experimental!)
	 * @experimental Experimental! Presently implemented to only work with pure text-based controls,
	 * the sap.ui.commons.Checkbox and sap.m.Image as well as sap.ui.commons.Image.
	 * It will also work for most simple input fields (TextField, CheckBox, but not ComboBox)
	 *
	 * @param {int} iColId column id
	 * @function
	 * @public
	 */
	Table.prototype.autoResizeColumn = function(iColId) {
		var oCol = this.getColumns()[iColId];
		this._iColumnResizeStart = null;
		var iNewWidth = this._calculateAutomaticColumnWidth(iColId);
		if (iNewWidth == null) {
			return;
		}

		oCol._iNewWidth = iNewWidth;
		this._oCalcColumnWidths[iColId] = oCol._iNewWidth;
		this._onColumnResized(null, iColId);
	};


	// =============================================================================
	// EVENT HANDLING & CLEANUP
	// =============================================================================

	/**
	 * attaches the required native event handlers
	 * @private
	 */
	Table.prototype._attachEvents = function() {

		var $this = this.$();

		// listen to the scroll events of the containers (for keyboard navigation)
		$this.find(".sapUiTableColHdrScr").scroll(jQuery.proxy(this._oncolscroll, this));
		$this.find(".sapUiTableCtrlScr").scroll(jQuery.proxy(this._oncntscroll, this));
		$this.find(".sapUiTableCtrlScrFixed").scroll(jQuery.proxy(this._oncntscroll, this));

		// sync row header > content (hover effect)
		$this.find(".sapUiTableRowHdr").hover(function() {
			jQuery(this).addClass("sapUiTableRowHvr");
			var iIndex = $this.find(".sapUiTableRowHdr").index(this);
			$this.find(".sapUiTableCtrlFixed > tbody > tr").filter(":eq(" + iIndex + ")").addClass("sapUiTableRowHvr");
			$this.find(".sapUiTableCtrlScroll > tbody > tr").filter(":eq(" + iIndex + ")").addClass("sapUiTableRowHvr");
		}, function() {
			jQuery(this).removeClass("sapUiTableRowHvr");
			$this.find(".sapUiTableCtrlFixed > tbody > tr").removeClass("sapUiTableRowHvr");
			$this.find(".sapUiTableCtrlScroll > tbody > tr").removeClass("sapUiTableRowHvr");
		});

		// sync content fixed > row header (hover effect)
		$this.find(".sapUiTableCtrlFixed > tbody > tr").hover(function() {
			jQuery(this).addClass("sapUiTableRowHvr");
			var iIndex = $this.find(".sapUiTableCtrlFixed > tbody > tr").index(this);
			$this.find(".sapUiTableRowHdr").filter(":eq(" + (iIndex) + ")").addClass("sapUiTableRowHvr");
			$this.find(".sapUiTableCtrlScroll > tbody > tr").filter(":eq(" + iIndex + ")").addClass("sapUiTableRowHvr");
		}, function() {
			jQuery(this).removeClass("sapUiTableRowHvr");
			$this.find(".sapUiTableRowHdr").removeClass("sapUiTableRowHvr");
			$this.find(".sapUiTableCtrlScroll > tbody > tr").removeClass("sapUiTableRowHvr");
		});

		// sync content scroll > row header (hover effect)
		$this.find(".sapUiTableCtrlScroll > tbody > tr").hover(function() {
			jQuery(this).addClass("sapUiTableRowHvr");
			var iIndex = $this.find(".sapUiTableCtrlScroll > tbody > tr").index(this);
			$this.find(".sapUiTableRowHdr").filter(":eq(" + iIndex + ")").addClass("sapUiTableRowHvr");
			$this.find(".sapUiTableCtrlFixed > tbody > tr").filter(":eq(" + iIndex + ")").addClass("sapUiTableRowHvr");
		}, function() {
			jQuery(this).removeClass("sapUiTableRowHvr");
			$this.find(".sapUiTableRowHdr").removeClass("sapUiTableRowHvr");
			$this.find(".sapUiTableCtrlFixed > tbody > tr").removeClass("sapUiTableRowHvr");
		});

		// listen to the resize handlers
		$this.find(".sapUiTableColRsz").mousedown(jQuery.proxy(this._onColumnResizeStart, this));

		// attach mousemove listener to update resizer position
		$this.find(".sapUiTableCtrlScr, .sapUiTableCtrlScrFixed, .sapUiTableColHdrScr, .sapUiTableColHdrFixed").mousemove(jQuery.proxy(this._onScrPointerMove, this));

		this._enableColumnAutoResizing();

		var $vsb = jQuery(this.getDomRef("vsb"));
		var $hsb = jQuery(this.getDomRef("hsb"));
		$vsb.bind("scroll.sapUiTableVScroll", this.onvscroll.bind(this));
		$hsb.bind("scroll.sapUiTableHScroll", this.onhscroll.bind(this));

		// For preventing the ItemNavigation to re-apply focus to old position (table cell)
		// when clicking on ScrollBar
		$hsb.bind("mousedown.sapUiTableHScroll", function(oEvent) {
			oEvent.preventDefault();
		});
		$vsb.bind("mousedown.sapUiTableVScroll", function(oEvent) {
			oEvent.preventDefault();
		});

		if (Device.browser.firefox) {
			this._getScrollTargets().bind("MozMousePixelScroll.sapUiTableMouseWheel", this._onMouseWheel.bind(this));
		} else {
			this._getScrollTargets().bind("wheel.sapUiTableMouseWheel", this._onMouseWheel.bind(this));
		}

		if (sap.ui.getCore().getConfiguration().getAnimation()) {
			jQuery("body").bind('webkitTransitionEnd transitionend',
				jQuery.proxy(function(oEvent) {
					if (jQuery(oEvent.target).has($this).length > 0) {
						this._iDefaultRowHeight = undefined;
						this._updateTableSizes();
					}
			}, this));
		}
	};

	/**
	 * Update the resizer position, according to mouse/touch position.
	 * @param {Event} oEvent the handled move event
	 * @private
	 */
	Table.prototype._onScrPointerMove = function(oEvent) {
		var oDomRef = this.getDomRef();
		if (this._bIsColumnResizerMoving || !oDomRef) {
			return;
		}

		var iPositionX = oEvent.clientX;
		var iTableRect = oDomRef.getBoundingClientRect();
		var iLastHoveredColumn = 0;
		var iResizerPositionX;
		if (this._bRtlMode) {
			iResizerPositionX = 10000;
		} else {
			iResizerPositionX = -10000;
		}

		for (var i = 0; i < this._aTableHeaders.length; i++) {
			var oTableHeaderRect = this._aTableHeaders[i].getBoundingClientRect();
			if (this._bRtlMode) {
				// 5px for resizer width
				if (iPositionX < oTableHeaderRect.right - 5) {
					iLastHoveredColumn = i;
					iResizerPositionX = oTableHeaderRect.left - iTableRect.left;
				}
			} else {
				// 5px for resizer width
				if (iPositionX > oTableHeaderRect.left + 5) {
					iLastHoveredColumn = i;
					iResizerPositionX = oTableHeaderRect.right - iTableRect.left;
				}
			}
		}

		var oColumn = this._getVisibleColumns()[iLastHoveredColumn];
		if (oColumn && oColumn.getResizable()) {
			this.$().find(".sapUiTableColRsz").css("left", iResizerPositionX + "px");
			this._iLastHoveredColumnIndex = iLastHoveredColumn;
		}
	};

	/**
	 * detaches the required native event handlers
	 * @private
	 */
	Table.prototype._detachEvents = function() {
		var $this = this.$();

		$this.find(".sapUiTableRowHdrScr").unbind();
		$this.find(".sapUiTableCtrl > tbody > tr").unbind();
		$this.find(".sapUiTableRowHdr").unbind();
		$this.find(".sapUiTableCtrlScr, .sapUiTableCtrlScrFixed, .sapUiTableColHdrScr, .sapUiTableColHdrFixed").unbind();
		$this.find(".sapUiTableColRsz").unbind();

		var $vsb = jQuery(this.getDomRef("vsb"));
		$vsb.unbind("scroll.sapUiTableVScroll");
		$vsb.unbind("mousedown.sapUiTableVScroll");

		var $hsb = jQuery(this.getDomRef("hsb"));
		$hsb.unbind("scroll.sapUiTableHScroll");
		$hsb.unbind("mousedown.sapUiTableHScroll");

		var $scrollTargets = this._getScrollTargets();
		$scrollTargets.unbind("MozMousePixelScroll.sapUiTableMouseWheel");
		$scrollTargets.unbind("wheel.sapUiTableMouseWheel");

		var $body = jQuery(document.body);
		$body.unbind('webkitTransitionEnd transitionend');

		if (this._sResizeHandlerId) {
			ResizeHandler.deregister(this._sResizeHandlerId);
			this._sResizeHandlerId = undefined;
		}
	};

	/**
	 * Collect the scroll wheel/touch targets needed for scrolling the table.
	 * @returns {*}
	 * @private
	 */
	Table.prototype._getScrollTargets = function() {
		var $ctrlScr = jQuery(this.getDomRef("sapUiTableCtrlScr"));
		var $rsz = jQuery(this.getDomRef("rsz"));
		var $ctrlScrFixed = jQuery(this.getDomRef("sapUiTableCtrlScrFixed"));
		var $rowHdrScr = jQuery(this.getDomRef("sapUiTableRowHdrScr"));
		return $ctrlScr.add($ctrlScrFixed).add($rowHdrScr).add($rsz);
	};

	/**
	 * cleanup the timers when not required anymore
	 * @private
	 */
	Table.prototype._cleanUpTimers = function() {

		for (var sKey in this._mTimeouts) {
			if (this._mTimeouts[sKey]) {
				clearTimeout(this._mTimeouts[sKey]);
				this._mTimeouts[sKey] = undefined;
			}
		}
	};

	// =============================================================================
	// PRIVATE TABLE STUFF :)
	// =============================================================================
	/**
	 * updates the horizontal scrollbar
	 * @private
	 */
	Table.prototype._updateHSb = function(oTableSizes) {
		// get the width of the container
		var $this = this.$();
		var iColsWidth = oTableSizes.tableCtrlScrollWidth;
		if (!!Device.browser.safari) {
			iColsWidth = Math.max(iColsWidth, this._getColumnsWidth(this.getFixedColumnCount()));
		}

		// add the horizontal scrollbar
		if (iColsWidth > oTableSizes.tableCtrlScrWidth) {
			// show the scrollbar
			if (!$this.hasClass("sapUiTableHScr")) {
				$this.addClass("sapUiTableHScr");

				if (!!Device.browser.safari) {
					var $sapUiTableColHdr = $this.find(".sapUiTableCtrlScroll, .sapUiTableColHdrScr > .sapUiTableColHdr");
					// min-width on table elements does not work for safari
					if (this._bjQueryLess18) {
						$sapUiTableColHdr.width(iColsWidth);
					} else {
						$sapUiTableColHdr.outerWidth(iColsWidth);
					}
				}
			}

			var iScrollPadding = oTableSizes.tableCtrlFixedWidth;
			if ($this.find(".sapUiTableRowHdrScr").length > 0) {
				iScrollPadding += oTableSizes.tableRowHdrScrWidth;
			}

			if (this.getRows().length > 0) {
				var $sapUiTableHSb = $this.find(".sapUiTableHSb");
				if (this._bRtlMode) {
					$sapUiTableHSb.css('margin-right', iScrollPadding + 'px');
				} else {
					$sapUiTableHSb.css('margin-left', iScrollPadding + 'px');
				}
			}

			var oHSbContent = this.getDomRef("hsb-content");
			if (oHSbContent) {
				oHSbContent.style.width = iColsWidth + "px";
			}
		} else {
			// hide the scrollbar
			if ($this.hasClass("sapUiTableHScr")) {
				$this.removeClass("sapUiTableHScr");
				if (!!Device.browser.safari) {
					// min-width on table elements does not work for safari
					$this.find(".sapUiTableCtrlScroll, .sapUiTableColHdr").css("width", "");
				}
			}
		}
	};

	/**
	 * Update the vertical scrollbar position
	 * @private
	 */
	Table.prototype._updateVSb = function(oTableSizes) {
		// move the vertical scrollbar to the scrolling table only
		var oVSb = this.getDomRef("vsb");
		if (!oVSb) {
			return;
		}

		var iFixedRowCount = this.getFixedRowCount();
		var iFixedBottomRowCount = this.getFixedBottomRowCount();
		if (iFixedRowCount > 0 || iFixedBottomRowCount > 0) {
			var $sapUiTableVSb = jQuery(oVSb);
			if (iFixedRowCount > 0) {
				$sapUiTableVSb.css('top', (oTableSizes.tableCtrlRowScrollTop - 1) + 'px');
			}
			if (iFixedBottomRowCount > 0) {
				$sapUiTableVSb.css('height', oTableSizes.tableCtrlRowScrollHeight + 'px');
			}
		}

		var iDefaultRowHeight = this._getDefaultRowHeight();
		this.getDomRef("vsb-content").style.height = this._iBindingLength * iDefaultRowHeight + "px";
		oVSb.scrollTop = this._getSanitizedFirstVisibleRow() * iDefaultRowHeight;

	};

	/**
	 * updates the vertical scrollbar
	 * @private
	 */
	Table.prototype._toggleVSb = function() {
		var $this = this.$();
		var bHasVsb = $this.hasClass("sapUiTableVScr");
		var oBinding = this.getBinding("rows");
		if (oBinding) {
			// check for paging mode or scrollbar mode
			if (this._oPaginator && this.getNavigationMode() === sap.ui.table.NavigationMode.Paginator) {
				// update the paginator (set the first visible row property)
				var iNumberOfPages = Math.ceil((this._iBindingLength || 0) / this.getVisibleRowCount());
				this._oPaginator.setNumberOfPages(iNumberOfPages);
				var iPage = Math.min(iNumberOfPages, Math.ceil((this.getFirstVisibleRow() + 1) / this.getVisibleRowCount()));
				this.setProperty("firstVisibleRow", (Math.max(iPage,1) - 1) * this.getVisibleRowCount(), true);
				this._oPaginator.setCurrentPage(iPage);
				if (this._oPaginator.getDomRef()) {
					this._oPaginator.rerender();
				}

				$this.removeClass("sapUiTableVScr");
			} else {
				// in case of scrollbar mode show or hide the scrollbar depending on the
				// calculated steps:
				if (this.getDomRef()) {
					var bIsScrollbarNeeded = this._iBindingLength > this.getVisibleRowCount();
					if (bIsScrollbarNeeded) {
						if (!bHasVsb) {
							$this.addClass("sapUiTableVScr");
						}
					} else {
						if (bHasVsb) {
							$this.removeClass("sapUiTableVScr");
						}
					}
				}
			}
		} else {
			// check for paging mode or scrollbar mode
			if (this._oPaginator && this.getNavigationMode() === sap.ui.table.NavigationMode.Paginator) {
				// update the paginator (set the first visible row property)
				this._oPaginator.setNumberOfPages(0);
				this._oPaginator.setCurrentPage(0);
				if (this._oPaginator.getDomRef()) {
					this._oPaginator.rerender();
				}
			} else if (bHasVsb) {
				$this.removeClass("sapUiTableVScr");
			}
		}
	};

	/**
	 * updates the binding contexts of the currently visible controls
	 * @param {boolean} bSuppressUpdate if true, only context will be requested but no binding context set
	 * @param {Integer} iRowCount number of rows to be updated and number of contexts to be requested from binding
	 * @param {String} sReason reason for the update; used to control further lifecycle
	 * @private
	 */
	Table.prototype._updateBindingContexts = function(bSuppressUpdate, iRowCount, sReason) {
		var aRows = this.getRows(),
			oBinding = this.getBinding("rows"),
			oBindingInfo = this.mBindingInfos["rows"],
			aContexts;

		// fetch the contexts from the binding
		if (oBinding) {
			aContexts = this._getRowContexts(iRowCount, false, sReason);
		}

		if (!bSuppressUpdate) {
			var iFirstVisibleRow = this.getFirstVisibleRow();
			var bExecuteCallback = typeof this._updateTableCell === "function";
			// row heights must be reset to make sure that rows can shrink if they may have smaller content. The content
			// shall control the row height.
			this._resetRowHeights();
			for (var iIndex = aRows.length - 1; iIndex >= 0; iIndex--) {
				var oContext = aContexts ? aContexts[iIndex] : undefined;
				var oRow = aRows[iIndex];
				if (oRow) {
					//calculate the absolute row index, used by the Tree/AnalyticalTable to find the rendering infos for this row
					var iAbsoluteRowIndex = iFirstVisibleRow + iIndex;
					this._updateRowBindingContext(oRow, oContext, oBindingInfo && oBindingInfo.model, iAbsoluteRowIndex, bExecuteCallback, oBinding);
				}
			}
		}
	};

	/**
	 * updates the binding context a row
	 * @param {sap.ui.table.Row} oRow row to update
	 * @param {sap.ui.model.Context} oContext binding context of the row
	 * @param {String} sModelName name of the model
	 * @param {Integer} iAbsoluteRowIndex index of row considering the scroll position
	 * @param {boolean} bExecuteCallback if true this._updateTableCell must be implemented and will be executed
	 * @private
	 */
	Table.prototype._updateRowBindingContext = function(oRow, oContext, sModelName, iAbsoluteRowIndex, bExecuteCallback, oBinding) {
		// check for a context object (in case of grouping there could be custom context objects)
		oRow.setRowBindingContext(oContext, sModelName, oBinding);

		if (bExecuteCallback) {
			// call _updateTableCell on table control. _updateTableCell will be called on cell controls inside Row.setBindingContext
			var aCells = oRow.getCells();
			for (var i = 0, l = aCells.length; i < l; i++) {
				if (aCells[i]) {
					this._updateTableCell(aCells[i], oContext, aCells[i].$().closest("td"), iAbsoluteRowIndex);
				}
			}
		}
	};

	/**
	 * check if data is available in the table
	 * @private
	 */
	Table.prototype._hasData = function() {
		var oBinding = this.getBinding("rows");
		if (!oBinding || (oBinding.getLength() || 0) === 0) {
			return false;
		}
		return true;
	};

	/**
	 * show or hide the no data container
	 * @private
	 */
	Table.prototype._updateNoData = function() {
		// no data?
		if (this.getShowNoData()) {
			this.$().toggleClass("sapUiTableEmpty", !this._hasData());
		}
	};


	/**
	 * determines the currently visible columns (used for simply updating only the
	 * controls of the visible columns instead of the complete row!)
	 * @private
	 */
	Table.prototype._determineVisibleCols = function(oTableSizes) {
		// determine the visible colums
		var $this = this.$();

		if ($this.hasClass("sapUiTableHScr")) {

			var bRtl = this._bRtlMode;

			// calculate the view port
			var iScrollLeft = oTableSizes.tableHSbScrollLeft;
			var iScrollWidth = oTableSizes.tableCtrlScrollWidth;
			var iScrWidth = oTableSizes.tableCtrlScrWidth;

			if (bRtl && Device.browser.firefox && iScrollLeft < 0) {
				// Firefox deals with negative scrollPosition in RTL mode
				iScrollLeft = iScrollLeft * -1;
			}

			var iScrollRight = iScrollLeft + iScrWidth;
			// has the view port changed?
			if (this._iOldScrollLeft !== iScrollLeft || this._iOldScrollRight !== iScrollRight || this._bForceVisibleColCalc) {
				// calculate the first and last visible column
				var iLeft = bRtl ? iScrollWidth : 0;

				if ((Device.browser.internet_explorer || Device.browser.firefox) && bRtl) {
					// Assume ScrollWidth=100px, Scroll to the very left in RTL mode
					// IE has reverse scroll position (Chrome = 0, IE = 100, FF = -100)
					iLeft = 0;
				}

				this._aVisibleColumns = [];
				for (var i = 0, l = this.getFixedColumnCount(); i < l; i++) {
					this._aVisibleColumns.push(i);
				}

				var aHeaderWidths = oTableSizes.headerWidths;
				for (var i = 0; i < aHeaderWidths.length; i++) {
					var iHeaderWidth = aHeaderWidths[i];
					if (bRtl && Device.browser.chrome) {
						iLeft -= iHeaderWidth;
					}
					if (iLeft + iHeaderWidth >= iScrollLeft && iLeft <= iScrollRight) {
						//var iColIndex = parseInt(jQuery(oElement).data('sap-ui-headcolindex'),10);
						this._aVisibleColumns.push(i);
					}
					if (!bRtl || (Device.browser.internet_explorer || Device.browser.firefox)) {
						iLeft += iHeaderWidth;
					}
				}

				// keep the view port information (performance!!)
				this._iOldScrollLeft = iScrollLeft;
				this._iOldScrollRight = iScrollRight;
				this._bForceVisibleColCalc = false;
			}
		} else {
			this._aVisibleColumns = [];
			var aCols = this.getColumns();
			for (var i = 0, l = aCols.length; i < l; i++) {
				if (aCols[i].shouldRender()) {
					this._aVisibleColumns.push(i);
				}
			}
		}
	};

	/**
	 * enables automatic resizing on doubleclick on a column if the corresponding column attribute is set
	 * @experimental Experimental, only works with limited control set
	 * @function
	 * @private
	 */
	Table.prototype._enableColumnAutoResizing = function () {
		var $resizer = jQuery(this.getDomRef("rsz"));
		if ($resizer.length > 0){
			this._bindSimulatedDoubleclick($resizer, null /* fnSingleClick*/, this._onAutomaticColumnResize /* fnDoubleClick */);
		}
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.removeColumn = function (oColumn) {
		var oResult = this.removeAggregation('columns', oColumn);
		this._bDetermineVisibleCols = true;

		if (typeof oColumn === "number" && oColumn > -1) {
			oColumn = this.getColumns()[oColumn];
		}

		var iIndex = jQuery.inArray(oColumn, this._aSortedColumns);
		if (this._iNewColPos === undefined && iIndex >= 0) {
			this._aSortedColumns.splice(iIndex, 1);
		}
		this._resetRowTemplate();
		return oResult;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.removeAllColumns = function() {
		var oResult = this.removeAllAggregation('columns');
		this._aSortedColumns = [];
		this._resetRowTemplate();
		return oResult;
	};

	/*
	 * @see JSDoc generated by SAPUI5 contdrol API generator
	 */
	Table.prototype.destroyColumns = function() {
		var oResult = this.destroyAggregation('columns');
		this._aSortedColumns = [];
		this._resetRowTemplate();
		return oResult;
	};


	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.addColumn = function (oColumn) {
		var that = this;
		this.addAggregation('columns', oColumn);
		oColumn.attachEvent('_widthChanged', function(oEvent) {
			that._bForceVisibleColCalc = true;
		});

		this._bDetermineVisibleCols = true;
		this._resetRowTemplate();
		return this;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.insertColumn = function (oColumn, iIndex) {
		var that = this;
		this.insertAggregation('columns', oColumn, iIndex);
		oColumn.attachEvent('_widthChanged', function() {
			that._bForceVisibleColCalc = true;
		});

		this._bDetermineVisibleCols = true;
		this._resetRowTemplate();
		return this;
	};

	/**
	 * returns the count of rows when bound or 0
	 * @private
	 */
	Table.prototype._getRowCount = function() {
		return this._iBindingLength;
	};

	/**
	 * returns the count of rows which can ca selected when bound or 0
	 * @private
	 */
	Table.prototype._getSelectableRowCount = function() {
		return this._iBindingLength;
	};


	/**
	 * Returns the current top scroll position of the scrollbar (row number)
	 * @private
	 */
	Table.prototype._getFirstVisibleRowByScrollTop = function(iScrollTop) {
		var oVsb = this.getDomRef("vsb");
		if (oVsb) {
			iScrollTop = (typeof iScrollTop === "undefined") ? oVsb.scrollTop : iScrollTop;
			return Math.ceil(iScrollTop / this._getDefaultRowHeight());
		} else {
			if (this.getNavigationMode() === sap.ui.table.NavigationMode.Paginator) {
				return (((this._oPaginator.getCurrentPage() || 1) - 1) * this.getVisibleRowCount());
			} else {
				return 0;
			}
		}
	};

	/**
	 * returns the count of visible columns
	 * @private
	 */
	Table.prototype._getVisibleColumns = function() {
		var aColumns = [];
		var aCols = this.getColumns();
		for (var i = 0, l = aCols.length; i < l; i++) {
			if (aCols[i].shouldRender()) {
				aColumns.push(aCols[i]);
			}
		}
		return aColumns;
	};

	/**
	 * returns the count of visible columns
	 * @private
	 */
	Table.prototype._getVisibleColumnCount = function() {
		return this._getVisibleColumns().length;
	};

	/**
	 * returns the row count of headers
	 * @private
	 */
	Table.prototype._getHeaderRowCount = function() {
		if (!this.getColumnHeaderVisible()) {
			return 0;
		} else if (!this._useMultiHeader()) {
			return 1;
		}
		var iHeaderRows = 0;
		jQuery.each(this._getVisibleColumns(), function(iIndex, oColumn) {
			iHeaderRows = Math.max(iHeaderRows,  oColumn.getMultiLabels().length);
		});
		return iHeaderRows;
	};

	/**
	 * returns if multi header beahviour is used or not
	 * @private
	 */
	Table.prototype._useMultiHeader = function() {
		var useMultiLabels = false;
		jQuery.each(this._getVisibleColumns(), function(iIndex, oColumn) {
			if (oColumn.getMultiLabels().length > 0) {
				useMultiLabels = true;
				return false;
			}
		});
		return useMultiLabels;
	};


	/**
	 * Returns the summed width of all rendered columns
	 * @private
	 * @param {Number} iStartColumn starting column for calculating the width
	 * @param {Number} iEndColumn ending column for calculating the width
	 * @returns {Number} the summed column width
	 */
	Table.prototype._getColumnsWidth = function(iStartColumn, iEndColumn) {
		// first calculate the min width of the table for all columns
		var aCols = this.getColumns();
		var iColsWidth = 0;

		if (iStartColumn !== 0 && !iStartColumn) {
			iStartColumn = 0;
		}
		if (iEndColumn !== 0 && !iEndColumn) {
			iEndColumn = aCols.length;
		}

		for (var i = iStartColumn, l = iEndColumn; i < l; i++) {
			if (aCols[i] && aCols[i].shouldRender()) {
				iColsWidth += this._CSSSizeToPixel(aCols[i].getWidth());
			}
		}

		return iColsWidth;

	};

	/**
	 * Calculates the pixel value from a given CSS size and returns it with or without unit.
	 * @param sCSSSize
	 * @param bReturnWithUnit
	 * @returns {string|number} Converted CSS value in pixel
	 * @private
	 */
	Table.prototype._CSSSizeToPixel = function(sCSSSize, bReturnWithUnit) {
		var sPixelValue = this._iColMinWidth;

		if (sCSSSize) {
			if (jQuery.sap.endsWith(sCSSSize, "px")) {
				sPixelValue = parseInt(sCSSSize, 10);
			} else if (jQuery.sap.endsWith(sCSSSize, "em") || jQuery.sap.endsWith(sCSSSize, "rem")) {
				sPixelValue = Math.ceil(parseFloat(sCSSSize) * this._getBaseFontSize());
			}
		}

		if (bReturnWithUnit) {
			return sPixelValue + "px";
		} else {
			return parseInt(sPixelValue, 10);
		}
	};

	Table.prototype._getBaseFontSize = function() {
		return this._iBaseFontSize;
	};

	/**
	 * Triggered by the ResizeHandler if width/height changed.
	 * @private
	 */
	Table.prototype._onTableResize = function() {
		if (this._bInvalid || !this.getDomRef()) {
			return;
		}

		this._updateTableSizes();
	};

	Table.prototype._handleRowCountModeAuto = function(iTableAvailableSpace) {
		var oBinding = this.getBinding("rows");
		if (oBinding && this.getRows().length > 0) {
			return this._executeAdjustRows(iTableAvailableSpace);
		} else {
			var that = this;
			var bReturn = !this._mTimeouts.handleRowCountModeAutoAdjustRows;
			var iBusyIndicatorDelay = that.getBusyIndicatorDelay();
			var bEnableBusyIndicator = this.getEnableBusyIndicator();
			if (oBinding && bEnableBusyIndicator) {
				that.setBusyIndicatorDelay(0);
				that.setBusy(true);
			}

			if (iTableAvailableSpace) {
				this._setRowContentHeight(iTableAvailableSpace);
			}

			this._mTimeouts.handleRowCountModeAutoAdjustRows = this._mTimeouts.handleRowCountModeAutoAdjustRows || window.setTimeout(function() {
					that._executeAdjustRows();
					that._mTimeouts.handleRowCountModeAutoAdjustRows = undefined;
					if (bEnableBusyIndicator) {
						that.setBusy(false);
						that.setBusyIndicatorDelay(iBusyIndicatorDelay);
					}
				}, 0);
			return bReturn;
		}
	};

	Table.prototype._executeAdjustRows = function(iTableAvailableSpace) {
		iTableAvailableSpace = iTableAvailableSpace || this._determineAvailableSpace();

		//if visibleRowCountMode is auto change the visibleRowCount according to the parents container height
		var iRows = this._calculateRowsToDisplay(iTableAvailableSpace);
		// if minAutoRowCount has reached, table should use block this height.
		// In case row > minAutoRowCount, the table height is 0, because ResizeTrigger must detect any changes of the table parent.
		if (iRows == this._determineMinAutoRowCount()) {
			this.$().height("auto");
		} else {
			this.$().height("0px");
		}

		return this._adjustRows(iRows);
	};

	/**
	 * Synchronizes the <th> width of the table, with the rendered header divs.
	 * @private
	 */
	Table.prototype._syncColumnHeaders = function(oTableSizes) {
		var oDomRef = this.getDomRef();
		if (!oDomRef) {
			// _syncColumnHeaders gets called async, there might be no DomRef anymore
			return;
		}
		var $this = this.$();

		var aHeaderWidths = oTableSizes.headerWidths;
		var iFixedColumns = this.getFixedColumnCount();
		var aVisibleColumns = this._getVisibleColumns();
		if (aVisibleColumns.length == 0) {
			return;
		}

		// Select only table headers (identified by data-sap-ui-headcolindex attribute). Not the row header.
		var $colHeaderContainer = $this.find(".sapUiTableColHdr");
		var $colHdrScr = $this.find(".sapUiTableColHdrScr");
		var $cols = $colHeaderContainer.find(".sapUiTableCol");
		var $tableHeaders = $this.find(".sapUiTableCtrlFirstCol > th:not(.sapUiTableColSel)");
		this._aTableHeaders = $tableHeaders;

		// Create map with source table headers and their corresponding resizers.
		var mHeaders = {};

		// Traverse the source table headers, which are needed to determine the column head width
		$tableHeaders.each(function(iIndex, oElement) {
			var iHeadColIndex = oElement.getAttribute("data-sap-ui-headcolindex");
			var iHeaderWidth = aHeaderWidths[iIndex];

			// set width of target column div
			var iTargetWidth;
			var oVisibleColumn = aVisibleColumns[iIndex];
			if (oVisibleColumn) {
				iTargetWidth = iHeaderWidth;
			}

			// for the first column also calculate the width of the hidden column
			if (iIndex == 0 || iIndex == iFixedColumns) {
				iTargetWidth += Math.max(0, oTableSizes.invisibleColWidth);
			}

			// apply the width of the column
			var	vHeaderSpan = aVisibleColumns[iIndex] ? aVisibleColumns[iIndex].getHeaderSpan() : 1,
				aHeaderData = [],
				aSpans;

			if (vHeaderSpan) {
				// vHeaderSpan can be an array for multi column header rows purpose.
				if (!jQuery.isArray(vHeaderSpan)) {
					vHeaderSpan = [vHeaderSpan];
				}
				jQuery.each(vHeaderSpan, function(iSpanIndex, iSpan) {
					vHeaderSpan[iSpanIndex] = Math.max(iSpan, 1);
				});
				aSpans = vHeaderSpan;
			} else {
				aSpans = [1];
			}

			for (var i = 0; i < aSpans.length; i++) {
				aHeaderData[i] = {
					width: iTargetWidth,
					span: 1
				};

				for (var j = 1; j < aSpans[i]; j++) {
					var oHeader = $tableHeaders[iIndex + j];
					if (oHeader) {
						aHeaderData[i].width += aHeaderWidths[iIndex + j];
						aHeaderData[i].span = aSpans[i];
					}
				}
			}

			if (oVisibleColumn) {
				mHeaders[iHeadColIndex] = {
					domRefColumnTh: oElement,
					domRefColumnDivs: [],
					aHeaderData: aHeaderData
				};
			}
		});

		var that = this;
		// Map target column header divs to corresponding source table header.
		$cols.each(function(iIndex, oElement) {
			var iColIndex = parseInt(oElement.getAttribute("data-sap-ui-colindex"), 10);
			var mHeader = mHeaders[iColIndex];
			if (mHeader) {
				mHeader.domRefColumnDivs.push(oElement);
			} else {
				jQuery.sap.log.error("Inconsistent DOM / Control Tree combination", that);
			}
		});

		jQuery.each(mHeaders, function(iIndex, mHeader) {
			for (var i = 0; i < mHeader.domRefColumnDivs.length; i++) {
				var oHeaderData = mHeader.aHeaderData[0];
				if (mHeader.aHeaderData[i]) {
					oHeaderData = mHeader.aHeaderData[i];
				}
				if (mHeader.domRefColumnDivs[i]) {
					mHeader.domRefColumnDivs[i].style.width = oHeaderData.width + "px";
					mHeader.domRefColumnDivs[i].setAttribute("data-sap-ui-colspan", oHeaderData.span);
				} else {
					jQuery.sap.log.error("Inconsistent DOM / Control Tree combination", that);
				}
			}
		});

		// Table Column Height Calculation
		// we change the height of the cols, col header and the row header to auto to
		// find out whether to use the height of a cell or the min height of the col header.
		var bHasColHdrHeight = this.getColumnHeaderHeight() > 0;
		if (!bHasColHdrHeight) {
			// Height of one row within the header
			// avoid half pixels
			$cols.each(function(index, item) {
				item.style.height = oTableSizes.columnRowOuterHeight + "px";
			});

			var oColHdrCnt = oDomRef.querySelector(".sapUiTableColHdrCnt");
			if (oColHdrCnt) {
				oColHdrCnt.style.height = Math.floor(oTableSizes.columnRowHeight * this._getHeaderRowCount()) + "px";
			}
		}

		// Sync width of content scroll area to header scroll area
		$colHdrScr.each(function(index, item) {
			item.style.width = oTableSizes.tableCtrlScrWidth + "px";
		});
	};

	/**
	 * disables text selection on the document (disabled fro Dnd)
	 * @private
	 */
	Table.prototype._disableTextSelection = function (oElement) {
		// prevent text selection
		jQuery(oElement || document.body).
			attr("unselectable", "on").
			css({
				"-moz-user-select": "none",
				"-webkit-user-select": "none",
				"user-select": "none"
	        }).
			bind("selectstart", function(oEvent) {
				oEvent.preventDefault();
				return false;
			});
	};

	/**
	 * enables text selection on the document (disabled fro Dnd)
	 * @private
	 */
	Table.prototype._enableTextSelection = function (oElement) {
		jQuery(oElement || document.body).
			attr("unselectable", "off").
			css({
				"-moz-user-select": "",
				"-webkit-user-select": "",
				"user-select": ""
	        }).
			unbind("selectstart");
	};

	/**
	 * clears the text selection on the document (disabled fro Dnd)
	 * @private
	 */
	Table.prototype._clearTextSelection = function () {
		if (window.getSelection) {
		  if (window.getSelection().empty) {  // Chrome
		    window.getSelection().empty();
		  } else if (window.getSelection().removeAllRanges) {  // Firefox
		    window.getSelection().removeAllRanges();
		  }
		} else if (document.selection && document.selection.empty) {  // IE?
			try {
			    document.selection.empty();
			} catch (ex) {
			    // ignore error to as a workaround for bug in IE8
			}
		}
	};

	// =============================================================================
	// CONTROL EVENT HANDLING
	// =============================================================================

	/**
	 * will be called by the vertical scrollbar. updates the visualized data by
	 * applying the first visible (scrollpos) row from the vertical scrollbar
	 * @private
	 */
	Table.prototype.onvscroll = function(oEvent) {
		var that = this;
		// for interaction detection
		jQuery.sap.interaction.notifyScrollEvent && jQuery.sap.interaction.notifyScrollEvent(oEvent);
		// do not scroll in action mode!
		this._leaveActionMode();
		if (this._bLargeDataScrolling && !this._bIsScrolledByWheel) {
			window.clearTimeout(this._mTimeouts.scrollUpdateTimerId);
			this._mTimeouts.scrollUpdateTimerId = window.setTimeout(function() {
				that.setFirstVisibleRow(that._getFirstVisibleRowByScrollTop(), true);
				that._mTimeouts._sScrollUpdateTimerId = null;
			}, 300);
		} else {
			this.setFirstVisibleRow(this._getFirstVisibleRowByScrollTop(), true);
		}
		this._bIsScrolledByWheel = false;
	};

	/**
	 * will be called by the paginator. updates the visualized data by
	 * applying the first visible (scrollpos) row from the vertical scrollbar
	 * @private
	 */
	Table.prototype.onpscroll = function(oEvent) {
		// for interaction detection
		jQuery.sap.interaction.notifyScrollEvent && jQuery.sap.interaction.notifyScrollEvent(oEvent);
		// do not scroll in action mode!
		this._leaveActionMode();

		var iFirstVisibleRow = 0;
		if (this.getNavigationMode() === sap.ui.table.NavigationMode.Paginator) {
			iFirstVisibleRow = (((this._oPaginator.getCurrentPage() || 1) - 1) * this.getVisibleRowCount());
		}

		this.setFirstVisibleRow(iFirstVisibleRow, true);
	};

	/**
	 * Handler for mousewheel event on scroll areas.
	 * @private
	 */
	Table.prototype._onMouseWheel = function(oEvent) {
		var oOriginalEvent = oEvent.originalEvent;
		var bIsHorizontal = oOriginalEvent.shiftKey;
		var iScrollDelta = 0;
		if (Device.browser.firefox) {
			iScrollDelta = oOriginalEvent.detail;
		} else {
			if (bIsHorizontal) {
				iScrollDelta = oOriginalEvent.deltaX;
			} else {
				iScrollDelta = oOriginalEvent.deltaY;
			}
		}

		if (bIsHorizontal) {
			var oHsb = this.getDomRef("hsb");
			if (oHsb) {
				oHsb.scrollLeft = oHsb.scrollLeft + iScrollDelta;
			}
		} else {
			var oVsb = this.getDomRef("vsb");
			if (oVsb) {
				this._bIsScrolledByWheel = true;
				oVsb.scrollTop = oVsb.scrollTop + iScrollDelta;
			}
		}

		oEvent.preventDefault();
		oEvent.stopPropagation();
	};

	/**
	 * sync the column header and content
	 * @private
	 */
	Table.prototype._syncHeaderAndContent = function(oTableSizes) {
		if (!this._bSyncScrollLeft) {
			this._bSyncScrollLeft = true;
			// synchronize the scroll areas
			var $this = this.$();
			var iHSbScrollLeft = oTableSizes.tableHSbScrollLeft;
			$this.find(".sapUiTableColHdrScr").scrollLeft(iHSbScrollLeft);
			$this.find(".sapUiTableCtrlScr").scrollLeft(iHSbScrollLeft);
			this._bSyncScrollLeft = false;
		}
	};

	/**
	 * will be called when the horizontal scrollbar is used. since the table does
	 * not render/update the data of all columns (only the visible ones) in case
	 * of scrolling horizontally we need to update the content of the columns which
	 * became visible.
	 * @private
	 */
	Table.prototype.onhscroll = function(oEvent) {
		jQuery.sap.interaction.notifyScrollEvent && jQuery.sap.interaction.notifyScrollEvent(oEvent);
		if (!this._bOnAfterRendering) {
			var oTableSizes = this._collectTableSizes();
			this._syncHeaderAndContent(oTableSizes);
			this._determineVisibleCols(oTableSizes);
		}
	};

	/**
	 * when navigating within the column header we need to synchronize the content
	 * area with the position (scrollLeft) of the column header.
	 * @private
	 */
	Table.prototype._oncolscroll = function() {
		if (!this._bSyncScrollLeft) {
			var oHsb = this.getDomRef("hsb");
			if (oHsb) {
				var oColHdrScr = this.getDomRef().querySelector(".sapUiTableColHdrScr");
				var iScrollLeft = 0;
				if (oColHdrScr) {
					iScrollLeft = oColHdrScr.scrollLeft;
				}
				oHsb.scrollLeft = iScrollLeft;
			}
		}
	};

	/**
	 * when navigating within the content area we need to synchronize the column
	 * header with the position (scrollLeft) of the content area.
	 * @private
	 */
	Table.prototype._oncntscroll = function() {
		if (!this._bSyncScrollLeft) {
			var oHsb = this.getDomRef("hsb");
			if (oHsb) {
				var oColHdrScr = this.getDomRef().querySelector(".sapUiTableCtrlScr");
				oHsb.scrollLeft = oColHdrScr.scrollLeft;
			}
		}
	};


	/**
	 * listens to the mousedown events for starting column drag & drop. therefore
	 * we wait 200ms to make sure it is no click on the column to open the menu.
	 * @private
	 */
	Table.prototype.onmousedown = function(oEvent) {
		// check whether item navigation should be reapplied from scratch
		if (this._bItemNavigationInvalidated) {
			this._initItemNavigation();
		}

		// only move on left click!
		var bLeftButton = oEvent.button === 0;
		var bIsTouchMode = this._isTouchMode(oEvent);

		if (bLeftButton) {
			var $target = jQuery(oEvent.target);

			var $splitter = this.$("sb");
			if (oEvent.target == $splitter[0]) {

				// Fix for IE text selection while dragging
				jQuery(document.body).bind("selectstart", jQuery.proxy(this._splitterSelectStart, this));

				var offset = $splitter.offset();
				var height = $splitter.height();
				var width = $splitter.width();

				jQuery(document.body).append(
						"<div id=\"" + this.getId() + "-ghost\" class=\"sapUiTableInteractiveResizerGhost\" style =\" height:" + height + "px; width:"
						+ width + "px; left:" + offset.left + "px; top:" + offset.top + "px\" ></div>");

				// append overlay over splitter to enable correct functionality of moving the splitter
				$splitter.append(
						"<div id=\"" + this.getId() + "-overlay\" style =\"left: 0px;" +
								" right: 0px; bottom: 0px; top: 0px; position:absolute\" ></div>");

				var $Document = jQuery(document);
				if (bIsTouchMode) {
					$Document.bind("touchend.sapUiTableInteractiveResize", jQuery.proxy(this._onGhostMouseRelease, this));
					$Document.bind("touchmove.sapUiTableInteractiveResize", jQuery.proxy(this._onGhostMouseMove, this));
				} else {
					$Document.bind("mouseup.sapUiTableInteractiveResize", jQuery.proxy(this._onGhostMouseRelease, this));
					$Document.bind("mousemove.sapUiTableInteractiveResize", jQuery.proxy(this._onGhostMouseMove, this));
				}

				this._disableTextSelection();

				return;
			}

			var $col = $target.closest(".sapUiTableCol");
			if ($col.length === 1) {

				this._bShowMenu = true;
				this._mTimeouts.delayedMenuTimer = jQuery.sap.delayedCall(200, this, function() {
					this._bShowMenu = false;
				});

				var bIsColumnMenuTarget = this._isTouchMode(oEvent) && ($target.hasClass("sapUiTableColDropDown") || $target.hasClass("sapUiTableColResizer"));
				if (this.getEnableColumnReordering() && !bIsColumnMenuTarget) {
					var iIndex = parseInt($col.attr("data-sap-ui-colindex"), 10);
					if (iIndex > this._iLastFixedColIndex) {
						var oColumn = this.getColumns()[iIndex];

						this._mTimeouts.delayedActionTimer = jQuery.sap.delayedCall(200, this, function() {
							this._onColumnMoveStart(oColumn, bIsTouchMode);
						});
					}
				}
			}

			// in case of FireFox and CTRL+CLICK it selects the target TD
			//   => prevent the default behavior only in this case (to still allow text selection)
			var bCtrl = !!(oEvent.metaKey || oEvent.ctrlKey);
			if (!!Device.browser.firefox && bCtrl) {
				oEvent.preventDefault();
			}
		}

	};

	/**
	 * controls the action mode when clicking into the table control
	 * @private
	 */
	Table.prototype.onmouseup = function(oEvent) {
		// clean up the timer
		jQuery.sap.clearDelayedCall(this._mTimeouts.delayedActionTimer);

		if (oEvent.isMarked()) {
			// the event was already handled by some other handler, do nothing.
			return;
		}

		if (this.$().find(".sapUiTableCtrl td :focus").length > 0) {
			// when clicking into a focusable control we enter the action mode!
			this._enterActionMode(this.$().find(".sapUiTableCtrl td :focus"));
		} else {
			// when clicking anywhere else in the table we leave the action mode!
			this._leaveActionMode(oEvent);
		}
	};

	/**
	 * handles the selection when clicking on the table
	 * @private
	 */
	Table.prototype.onclick = function(oEvent) {
		// clean up the timer
		jQuery.sap.clearDelayedCall(this._mTimeouts.delayedActionTimer);

		if (oEvent.isMarked()) {
			// the event was already handled by some other handler, do nothing.
			return;
		}

		// forward the event
		if (!this._findAndfireCellEvent(this.fireCellClick, oEvent)) {
			this._onSelect(oEvent);
		} else {
			oEvent.preventDefault();
		}
	};

	/**
	 * handles the cell contextmenu eventing of the table, open the menus for cell, group header and column header
	 * @private
	 */
	Table.prototype.oncontextmenu = function(oEvent) {
		var $Target = jQuery(oEvent.target);
		var $Header = $Target.closest('.sapUiTableCol');
		if ($Header.length > 0) {
			var oColumn = sap.ui.getCore().byId($Header.attr("data-sap-ui-colid"));
			if (oColumn) {
				oColumn._openMenu($Header[0], false);
			}
			oEvent.preventDefault();
		} else {
			if (this._findAndfireCellEvent(this.fireCellContextmenu, oEvent, this._oncellcontextmenu)) {
				oEvent.preventDefault();
			}
		}
	};

	/**
	 * handles the default cell contextmenu
	 * @private
	 */
	Table.prototype._oncellcontextmenu = function(mParams) {
		if (this.getEnableCellFilter()) {
			// create the contextmenu instance the first time it is needed
			if (!this._oContextMenu) {
				jQuery.sap.require("sap.ui.unified.Menu");
				jQuery.sap.require("sap.ui.unified.MenuItem");

				this._oContextMenu = new sap.ui.unified.Menu(this.getId() + "-contextmenu");
				this.addDependent(this._oContextMenu);
			}

			// does the column support filtering?
			var oColumn = sap.ui.getCore().byId(mParams.columnId);
			var sProperty = oColumn.getFilterProperty();
			// currently only filter is possible by default cell context menu, if filtering is not allowed by
			// menu, don't open the context menu at all.
			if (oColumn && oColumn.isFilterableByMenu() && mParams.rowBindingContext) {
				// destroy all items of the menu and recreate
				this._oContextMenu.destroyItems();
				this._oContextMenu.addItem(new sap.ui.unified.MenuItem({
					text: this._oResBundle.getText("TBL_FILTER"),
					select: [function() {
						var oContext = this.getContextByIndex(mParams.rowIndex);
						var sValue = oContext.getProperty(sProperty);
						if (this.getEnableCustomFilter()) {
							// only fire custom filter event
							this.fireCustomFilter({
								column: oColumn,
								value: sValue
							});
						} else {
							this.filter(oColumn, sValue);
						}

					}, this]
				}));

				// open the popup below the cell
				var eDock = sap.ui.core.Popup.Dock;
				this._oContextMenu.open(false, mParams.cellDomRef, eDock.BeginTop, eDock.BeginBottom, mParams.cellDomRef, "none none");
				return true;
			}
		}
	};

	/**
	 * helper method to bind different functions to a click if both a single and a double click can occur on an element
	 * @experimental Experimental
	 * @function
	 * @private
	 */
	Table.prototype._bindSimulatedDoubleclick = function(element, fnClick, fnDoubleclick){
		var eventBound = "click";
		var that = this;
		if (!!Device.support.touch){
			//event needs to be touchend due to timing issues on the ipad
			eventBound = "touchend";
		}
		jQuery(element).on(eventBound, function(oEvent){
			oEvent.preventDefault();
			oEvent.stopPropagation();
			that._clicksRegistered = that._clicksRegistered + 1;
			if (that._clicksRegistered < 2){
				that._mTimeouts.singleClickTimer = jQuery.sap.delayedCall(that._doubleclickDelay, that, function(){
					that._clicksRegistered = 0;
					if (fnClick){
						fnClick.call(that, oEvent);
					}
				}, [oEvent]);
			} else {
				jQuery.sap.clearDelayedCall(that._mTimeouts.singleClickTimer);
				that._clicksRegistered = 0;
				fnDoubleclick.call(that, oEvent);
			}
		});
	};

	/**
	 * finds the cell on which the click or contextmenu event is executed and
	 * notifies the listener which control has been clicked or the contextmenu
	 * should be openend.
	 * @param {function} fnFire function to fire the event
	 * @param {DOMEvent} oEvent event object
	 * @return {boolean} cancelled or not
	 * @private
	 */
	Table.prototype._findAndfireCellEvent = function(fnFire, oEvent, fnContextMenu) {
		var $target = jQuery(oEvent.target);
		// find out which cell has been clicked
		var $cell = $target.closest("td[role='gridcell']");
		var sId = $cell.attr("id");
		var aMatches = /.*-row(\d*)-col(\d*)/i.exec(sId);
		var bCancel = false;
		if (aMatches) {
			var iRow = aMatches[1];
			var iCol = aMatches[2];
			var oRow = this.getRows()[iRow];
			var oCell = oRow && oRow.getCells()[iCol];
			var iRealRowIndex = oRow && oRow.getIndex();
			var sColId = oCell.data("sap-ui-colid");

			var oRowBindingContext;
			if (this.getBindingInfo("rows")) {
				oRowBindingContext = oRow.getBindingContext(this.getBindingInfo("rows").model);
			}

			var mParams = {
				rowIndex: iRealRowIndex,
				columnIndex: iCol,
				columnId: sColId,
				cellControl: oCell,
				rowBindingContext: oRowBindingContext,
				cellDomRef: $cell.get(0)
			};
			bCancel = !fnFire.call(this, mParams);
			if (!bCancel && typeof fnContextMenu === "function") {
				mParams.cellDomRef = $cell[0];
				bCancel = fnContextMenu.call(this, mParams);
			}
		}
		return bCancel;
	};

	/**
	 * handles the focus in to reposition the focus or prevent default handling for
	 * column resizing
	 * @private
	 */
	Table.prototype.onfocusin = function(oEvent) {
		// check whether item navigation should be reapplied from scratch
		if (!this._bIgnoreFocusIn && this._bItemNavigationInvalidated) {
			this._initItemNavigation();
		}

		var $target = jQuery(oEvent.target);
		var bNoData = this.$().hasClass("sapUiTableEmpty");
		var bControlBefore = $target.hasClass("sapUiTableCtrlBefore");

		// KEYBOARD HANDLING (_bIgnoreFocusIn is set in onsaptabXXX)
		if (!this._bIgnoreFocusIn && (bControlBefore || $target.hasClass("sapUiTableCtrlAfter"))) {
			// when entering the before or after helper DOM elements we put the
			// focus on the current focus element of the item navigation and we
			// leave the action mode!
			this._leaveActionMode();
			if (jQuery.contains(this.$().find('.sapUiTableColHdrCnt')[0], oEvent.target)) {
				jQuery(this._oItemNavigation.getFocusedDomRef() || this._oItemNavigation.getRootDomRef()).focus();
			} else {
				if (bControlBefore) {
					if (bNoData) {
						this._bIgnoreFocusIn = true;
						this.$().find(".sapUiTableCtrlEmpty").focus();
						this._bIgnoreFocusIn = false;
					} else {
						this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex() % this._oItemNavigation.iColumns, oEvent);
					}
				} else {
					this._oItemNavigation.focusItem((this._oItemNavigation.getFocusedIndex() % this._oItemNavigation.iColumns) + (this._oItemNavigation.iColumns * this._iLastSelectedDataRow), oEvent);
				}
			}

			if (!bNoData) {
				oEvent.preventDefault();
			}
		} else if (jQuery.sap.endsWith(oEvent.target.id, "-rsz")) {
			// prevent that the ItemNavigation grabs the focus!
			// only for the column resizing
			oEvent.preventDefault();
			oEvent.stopPropagation();
		}

		var $ctrlScr;
		var $FocusedDomRef = jQuery(oEvent.target);
		if ($FocusedDomRef.parent('.sapUiTableTr').length > 0) {
			$ctrlScr = jQuery(this.getDomRef("sapUiTableCtrlScr"));
		} else if ($FocusedDomRef.parent('.sapUiTableColHdr').length > 0) {
			$ctrlScr = jQuery(this.getDomRef("sapUiTableColHdrScr"));
		}

		if ((Device.browser.firefox || Device.browser.chrome) && $ctrlScr && $ctrlScr.length > 0) {
			var iCtrlScrScrollLeft = $ctrlScr.scrollLeft();
			var iCtrlScrWidth = $ctrlScr.width();
			var iCellLeft = $FocusedDomRef.position().left;
			var iCellRight = iCellLeft + $FocusedDomRef.width();
			var iOffsetLeft = iCellLeft - iCtrlScrScrollLeft;
			var iOffsetRight = iCellRight - iCtrlScrWidth - iCtrlScrScrollLeft;

			var oHsb = this.getDomRef("hsb");
			if (iOffsetRight > 0) {
				oHsb.scrollLeft = oHsb.scrollLeft + iOffsetRight + 2;
			} else if (iOffsetLeft < 0) {
				oHsb.scrollLeft = oHsb.scrollLeft + iOffsetLeft - 1;
			}
		}
	};

	/**
	 * The row index only considers the position of the row in the aggregation. It must be adapted
	 * to consider the firstVisibleRow offset or if a fixed bottom row was pressed
	 * @param {int} iRow row index of the control in the rows aggregation
	 * @returns {int} the adapted (absolute) row index
	 * @private
	 */
	Table.prototype._getAbsoluteRowIndex = function(iRow) {
		var iIndex = 0;
		var iFirstVisibleRow = this.getFirstVisibleRow();
		var iFixedBottomRowCount = this.getFixedBottomRowCount();
		var iVisibleRowCount = this.getVisibleRowCount();
		var iFirstFixedBottomRowIndex = iVisibleRowCount - iFixedBottomRowCount;

		if (iFixedBottomRowCount > 0 && iRow >= iFirstFixedBottomRowIndex) {
			iIndex = this.getBinding().getLength() - iVisibleRowCount + iRow;
		} else {
			iIndex = iFirstVisibleRow + iRow;
		}

		return iIndex;
	};

	// =============================================================================
	// SELECTION HANDLING
	// =============================================================================

		/**
	 * handles the row selection and the column header menu
	 * @private
	 */
	Table.prototype._onSelect = function(oEvent) {

		// trigger column menu
		var $target = jQuery(oEvent.target);

		// determine modifier keys
		var bShift = oEvent.shiftKey;
		var bCtrl = !!(oEvent.metaKey || oEvent.ctrlKey);

		// column header?
		var $col = $target.closest(".sapUiTableCol");
		if (this._bShowMenu && $col.length === 1) {
			var iIndex = parseInt($col.attr("data-sap-ui-colindex"), 10);
			var oColumn = this.getColumns()[iIndex];

			if ($target.hasClass("sapUiTableColDropDown")) {
				var bExecuteDefault = this.fireColumnSelect({
					column: oColumn
				});

				if (bExecuteDefault) {
					oColumn._openMenu($col[0], oEvent.type == "keyup");
				}
			} else {
				this._onColumnSelect(oColumn, $col[0], this._isTouchMode(oEvent), oEvent.type == "keyup");
			}

			return;
		}

		// row header?
		var $row = $target.closest(".sapUiTableRowHdr");
		if ($row.length === 1) {
			var iIndex = parseInt($row.attr("data-sap-ui-rowindex"), 10);
			this._onRowSelect(this._getAbsoluteRowIndex(iIndex), bShift, bCtrl);
			return;
		}

		// table control? (only if the selection behavior is set to row)
		var oClosestTd;
		if (oEvent.target) {
			var $ClosestTd = jQuery(oEvent.target).closest("td");
			if ($ClosestTd.length > 0) {
				oClosestTd = $ClosestTd[0];
			}
		}

		if (oClosestTd && (oClosestTd.getAttribute("role") == "gridcell" || jQuery(oClosestTd).hasClass("sapUiTableTDDummy")) && (
		    this.getSelectionBehavior() === sap.ui.table.SelectionBehavior.Row ||
		    this.getSelectionBehavior() === sap.ui.table.SelectionBehavior.RowOnly)) {
			var $row = $target.closest(".sapUiTableCtrl > tbody > tr");
			if ($row.length === 1) {
				var iIndex = parseInt($row.attr("data-sap-ui-rowindex"), 10);
				this._onRowSelect(this._getAbsoluteRowIndex(iIndex), bShift, bCtrl);
				return;
			}
		}

		// select all?
		if (jQuery.sap.containsOrEquals(this.getDomRef("selall"), oEvent.target)) {
			this._toggleSelectAll();
			return;
		}

	};


	// =============================================================================
	// ROW EVENT HANDLING
	// =============================================================================

	/**
	 *
	 * @param iRowIndex
	 * @returns {boolean}
	 * @private
	 */
	Table.prototype._isRowSelectable = function(iRowIndex) {
		return true;
	};

	/**
	 * handles the row selection (depending on the mode)
	 * @private
	 */
	Table.prototype._onRowSelect = function(iRowIndex, bShift, bCtrl) {

		// in case of IE and SHIFT we clear the text selection
		if (!!Device.browser.internet_explorer && bShift) {
			this._clearTextSelection();
		}

		// is the table bound?
		var oBinding = this.getBinding("rows");
		if (!oBinding) {
			return;
		}

		//var iRowIndex = Math.min(Math.max(0, iRowIndex), this.getBinding("rows").getLength() - 1);
		if (iRowIndex < 0 || iRowIndex >= (oBinding.getLength() || 0)) {
			return;
		}

		// Make sure that group headers, which represents a tree node in AnalyticalTable, are not selectable.
		if (!this._isRowSelectable(iRowIndex)) {
			return;
		}

		this._iSourceRowIndex = iRowIndex;

		var oSelMode = this.getSelectionMode();
		if (oSelMode !== sap.ui.table.SelectionMode.None) {
			if (oSelMode === sap.ui.table.SelectionMode.Single) {
				if (!this.isIndexSelected(iRowIndex)) {
					this.setSelectedIndex(iRowIndex);
				} else {
					this.clearSelection();
				}
			} else {
				// in case of multi toggle behavior a click on the row selection
				// header adds or removes the selected row and the previous seleciton
				// will not be removed
				if (oSelMode === sap.ui.table.SelectionMode.MultiToggle) {
					bCtrl = true;
				}
				if (bShift) {
					// If no row is selected getSelectedIndex returns -1 - then we simply
					// select the clicked row:
					var iSelectedIndex = this.getSelectedIndex();
					if (iSelectedIndex >= 0) {
						this.addSelectionInterval(iSelectedIndex, iRowIndex);
					} else {
						this.setSelectedIndex(iRowIndex);
					}
				} else {
					if (!this.isIndexSelected(iRowIndex)) {
						if (bCtrl) {
							this.addSelectionInterval(iRowIndex, iRowIndex);
						} else {
							this.setSelectedIndex(iRowIndex);
						}
					} else {
						if (bCtrl) {
							this.removeSelectionInterval(iRowIndex, iRowIndex);
						} else {
							if (this.getSelectedIndices().length === 1) {
								this.clearSelection();
							} else {
								this.setSelectedIndex(iRowIndex);
							}
						}
					}
				}
			}
		}

		this._iSourceRowIndex = undefined;

	};


	// =============================================================================
	// COLUMN EVENT HANDLING
	// =============================================================================

	/**
	 * column select event => opens the column menu
	 * @private
	 */
	Table.prototype._onColumnSelect = function(oColumn, oDomRef, bIsTouchMode, bWithKeyboard) {
		// On tablet open special column header menu
		if (bIsTouchMode) {
			var $ColumnHeader = jQuery(oDomRef);
			var $ColumnCell = $ColumnHeader.find(".sapUiTableColCell");

			if ($ColumnHeader.find(".sapUiTableColCellMenu").length < 1) {
				$ColumnCell.hide();

				var sColumnDropDownButton = "";
				if (oColumn._menuHasItems()) {
					sColumnDropDownButton = "<div class='sapUiTableColDropDown'></div>";
				}

				var sColumnResizerButton = "";
				if (oColumn.getResizable()) {
					sColumnResizerButton = "<div class='sapUiTableColResizer''></div>";
				}

				var $ColumnHeaderMenu = jQuery("<div class='sapUiTableColCellMenu'>" + sColumnDropDownButton + sColumnResizerButton + "</div>");
				$ColumnHeader.append($ColumnHeaderMenu);
				$ColumnHeader.bind("focusout", function() {
					this.cell.show();
					this.menu.remove();
					this.self.unbind("focusout");
				}.bind({
					cell: $ColumnCell,
					menu: $ColumnHeaderMenu,
					self: $ColumnHeader
				}));

				// listen to the resize handlers
				if (oColumn.getResizable()) {
					$ColumnHeader.find(".sapUiTableColResizer").bind("touchstart", jQuery.proxy(this._onColumnResizeStart, this));
				}
			}

			return;
		}

		// forward the event
		var bExecuteDefault = this.fireColumnSelect({
			column: oColumn
		});

		// if the default behavior should be prevented we suppress to open
		// the column menu!
		if (bExecuteDefault) {
			oColumn._openMenu(oDomRef, bWithKeyboard);
		}
	};

	/**
	 * Handler for touchstart on the table, needed for scrolling.
	 * @param oEvent
	 */
	Table.prototype.ontouchstart = function(oEvent) {
		if ('ontouchstart' in document) {
			this._aTouchStartPosition = null;
			this._bIsScrollVertical = null;
			var $scrollTargets = this._getScrollTargets();
			var bDoScroll = jQuery(oEvent.target).closest($scrollTargets).length > 0;
			if (bDoScroll) {
				var oTouch = oEvent.targetTouches[0];
				this._aTouchStartPosition = [oTouch.pageX, oTouch.pageY];
				var oVsb = this.getDomRef("vsb");
				if (oVsb) {
					this._iTouchScrollTop = oVsb.scrollTop;
				}

				var oHsb = this.getDomRef("hsb");
				if (oHsb) {
					this._iTouchScrollLeft = oHsb.scrollLeft;
				}
			}
		}
	};

	/**
	 * Handler for touchmove on the table, needed for scrolling.
	 * @param oEvent
	 */
	Table.prototype.ontouchmove = function(oEvent) {
		if ('ontouchstart' in document && this._aTouchStartPosition) {
			var oTouch = oEvent.targetTouches[0];
			var iDeltaX = (oTouch.pageX - this._aTouchStartPosition[0]);
			var iDeltaY = (oTouch.pageY - this._aTouchStartPosition[1]);
			if (this._bIsScrollVertical == null) {
				this._bIsScrollVertical = Math.abs(iDeltaY) > Math.abs(iDeltaX);
			}

			if (this._bIsScrollVertical) {
				var oVsb = this.getDomRef("vsb");
				if (oVsb) {
					var iScrollTop = this._iTouchScrollTop - iDeltaY;

					if (iScrollTop > 0 && iScrollTop < (this.getDomRef("vsb-content").clientHeight - oVsb.clientHeight) - 1) {
						oEvent.preventDefault();
						oEvent.stopPropagation();
					}
					oVsb.scrollTop = iScrollTop;
				}
			} else {
				var oHsb = this.getDomRef("hsb");
				if (oHsb) {
					var iScrollLeft = this._iTouchScrollLeft - iDeltaX;

					if (iScrollLeft > 0 && iScrollLeft < (this.getDomRef("hsb-content").clientWidth - oHsb.clientWidth) - 1) {
						oEvent.preventDefault();
						oEvent.stopPropagation();
					}
					oHsb.scrollLeft = iScrollLeft;
				}
			}
		}
	};


	/**
	 * start column moving
	 * @private
	 */
	Table.prototype._onColumnMoveStart = function(oColumn, bIsTouchMode) {
		this._disableTextSelection();

		var $col = oColumn.$();
		var iColIndex = parseInt($col.attr("data-sap-ui-colindex"), 10);

		if (iColIndex < this.getFixedColumnCount()) {
			return;
		}

		this.$().addClass("sapUiTableDragDrop");
		this._$colGhost = $col.clone().removeAttr("id");

		$col.css({
			"opacity": ".25"
		});

		this._$colGhost.addClass("sapUiTableColGhost").css({
			"left": -10000,
			"top": -10000,
			//Position is set to relative for columns later, if the moving is started a second time the position: relative overwrites
			//the absolut position set by the sapUiTableColGhost class, so we overrite the style attribute for position here to make
			//sure that the position is absolute
			"position": "absolute",
			"z-index": this.$().zIndex() + 10
		});

		// TODO: only for the visible columns!?
		this.$().find(".sapUiTableCol").each(function(iIndex, oElement) {

			var $col = jQuery(this);
			$col.css({position: "relative"});

			$col.data("pos", {
				left: $col.position().left,
				center: $col.position().left + $col.outerWidth() / 2,
				right:  $col.position().left + $col.outerWidth()
			});

		});

		this._$colGhost.appendTo(document.body);

		var $body = jQuery(document.body);
		if (bIsTouchMode) {
			$body.bind("touchmove.sapUiColumnMove", jQuery.proxy(this._onColumnMove, this));
			$body.bind("touchend.sapUiColumnMove", jQuery.proxy(this._onColumnMoved, this));
		} else {
			$body.bind("mousemove.sapUiColumnMove", jQuery.proxy(this._onColumnMove, this));
			$body.bind("mouseup.sapUiColumnMove", jQuery.proxy(this._onColumnMoved, this));
		}
	};

	/**
	 * move the column position the ghost
	 * @private
	 */
	Table.prototype._onColumnMove = function(oEvent) {
		var $this = this.$();
		var iLocationX = oEvent.pageX;
		var iLocationY = oEvent.pageY;
		if (oEvent && this._isTouchMode(oEvent)) {
			iLocationX = oEvent.targetTouches[0].pageX;
			iLocationY = oEvent.targetTouches[0].pageY;
			oEvent.stopPropagation();
			oEvent.preventDefault();
		}

		var bRtl = this._bRtlMode;
		var iRelX = iLocationX - $this.offset().left;
		var iDnDColIndex = parseInt(this._$colGhost.attr("data-sap-ui-colindex"), 10);
		var $DnDCol = this.getColumns()[iDnDColIndex].$();

		// find out the new col position
		var iOldColPos = this._iNewColPos;
		this._iNewColPos = iDnDColIndex;
		var that = this;
		$this.find(".sapUiTableCol").each(function(iIndex, oCol) {
			var $col = jQuery(oCol);
			var iColIndex = parseInt($col.attr("data-sap-ui-colindex"), 10);
			var vHeaderSpans = sap.ui.getCore().byId($col.attr("data-sap-ui-colid")).getHeaderSpan();
			var iSpan;

			if (vHeaderSpans) {
				if (jQuery.isArray(vHeaderSpans)) {
					iSpan = vHeaderSpans[0];
				} else {
					iSpan = vHeaderSpans;
				}
			} else {
				iSpan = 1;
			}

			if ($col.get(0) !== $DnDCol.get(0)) {

				var oPos = $col.data("pos");

				var bBefore = iRelX >= oPos.left && iRelX <= oPos.center;
				var bAfter = iRelX >= oPos.center && iRelX <= oPos.right;

				if (!bRtl) {
					if (bBefore) {
						that._iNewColPos = iColIndex;
					} else if (bAfter) {
						that._iNewColPos = iColIndex + iSpan;
					} else {
						that._iNewColPos = that._iNewColPos;
					}
				} else {
					if (bAfter) {
						that._iNewColPos = iColIndex;
					} else if (bBefore) {
						that._iNewColPos = iColIndex + iSpan;
					} else {
						that._iNewColPos = that._iNewColPos;
					}
				}

				if ((bBefore || bAfter) && iColIndex > iDnDColIndex) {
					that._iNewColPos--;
				}

			}

		});

		// prevent the reordering of the fixed columns
		if (this._iNewColPos <= this._iLastFixedColIndex) {
			this._iNewColPos = iOldColPos;
		}
		if (this._iNewColPos < this.getFixedColumnCount()) {
			this._iNewColPos = iOldColPos;
		}

		// animate the column move
		this._animateColumnMove(iDnDColIndex, iOldColPos, this._iNewColPos);

		// update the ghost position
		this._$colGhost.css({
			"left": iLocationX + 5,
			"top": iLocationY + 5
		});
	};

	/**
	 * animates the column movement
	 */
	Table.prototype._animateColumnMove = function(iColIndex, iOldPos, iNewPos) {

		var bRtl = this._bRtlMode;
		var $DnDCol = this.getColumns()[iColIndex].$();

		// position has been changed => reorder
		if (iOldPos !== iNewPos) {

			for (var i = Math.min(iOldPos, iNewPos), l = Math.max(iOldPos, iNewPos); i <= l; i++) {
				var oCol = this.getColumns()[i];
				if (i !== iColIndex && oCol.getVisible()) {
					oCol.$().stop(true, true).animate({left: "0px"});
				}
			}

			var iOffsetLeft = 0;
			if (iNewPos < iColIndex) {
				for (var i = iNewPos; i < iColIndex; i++) {
					var oCol = this.getColumns()[i];
					if (oCol.getVisible()) {
						var $col = oCol.$();
						iOffsetLeft -= $col.outerWidth();
						$col.stop(true, true).animate({left: $DnDCol.outerWidth() * (bRtl ? -1 : 1) + "px"});
					}
				}
			} else {
				for (var i = iColIndex + 1, l = iNewPos + 1; i < l; i++) {
					var oCol = this.getColumns()[i];
					if (oCol.getVisible()) {
						var $col = oCol.$();
						iOffsetLeft += $col.outerWidth();
						$col.stop(true, true).animate({left: $DnDCol.outerWidth() * (bRtl ? 1 : -1) + "px"});
					}
				}
			}
			$DnDCol.stop(true, true).animate({left: iOffsetLeft * (bRtl ? -1 : 1) + "px"});
		}

	};

	/**
	 * columns is moved => update!
	 * @private
	 */
	Table.prototype._onColumnMoved = function(oEvent) {
		var that = this;
		this.$().removeClass("sapUiTableDragDrop");

		var iDnDColIndex = parseInt(this._$colGhost.attr("data-sap-ui-colindex"), 10);
		var oDnDCol = this.getColumns()[iDnDColIndex];

		var $body = jQuery(document.body);
		$body.unbind("touchmove.sapUiColumnMove");
		$body.unbind("touchend.sapUiColumnMove");
		$body.unbind("mousemove.sapUiColumnMove");
		$body.unbind("mouseup.sapUiColumnMove");

		this._$colGhost.remove();
		this._$colGhost = undefined;

		this._enableTextSelection();

		// forward the event
		var bExecuteDefault = this.fireColumnMove({
			column: oDnDCol,
			newPos: this._iNewColPos
		});

		var bMoveRight = iDnDColIndex < this._iNewColPos;

		if (bExecuteDefault && this._iNewColPos !== undefined && this._iNewColPos !== iDnDColIndex) {
			this.removeColumn(oDnDCol);
			this.insertColumn(oDnDCol, this._iNewColPos);
			var vHeaderSpan = oDnDCol.getHeaderSpan(),
				iSpan;

			if (vHeaderSpan) {
				if (jQuery.isArray(vHeaderSpan)) {
					iSpan = vHeaderSpan[0];
				} else {
					iSpan = vHeaderSpan;
				}
			} else {
				iSpan = 1;
			}

			if (iSpan > 1) {
				if (!bMoveRight) {
					this._iNewColPos++;
				}
				for (var i = 1; i < iSpan; i++) {
					var oDependentCol = this.getColumns()[bMoveRight ? iDnDColIndex : iDnDColIndex + i];
					this.removeColumn(oDependentCol);
					this.insertColumn(oDependentCol, this._iNewColPos);
					this.fireColumnMove({
						column: oDependentCol,
						newPos: this._iNewColPos
					});
					if (!bMoveRight) {
						this._iNewColPos++;
					}
				}
			}
			this._oColHdrItemNav.setFocusedIndex(this._iNewColPos);
		} else {
			this._animateColumnMove(iDnDColIndex, this._iNewColPos, iDnDColIndex);
			oDnDCol.$().css({
				"backgroundColor": "",
				"backgroundImage": "",
				"opacity": ""
			});
		}

		// Re-apply focus
		if (this._mTimeouts.reApplyFocusTimer) {
			window.clearTimeout(this._mTimeouts.reApplyFocusTimer);
		}
		this._mTimeouts.reApplyFocusTimer = window.setTimeout(function() {
			var iOldFocusedIndex = that._oItemNavigation.getFocusedIndex();
			that._oItemNavigation.focusItem(0, oEvent);
			that._oItemNavigation.focusItem(iOldFocusedIndex, oEvent);
		}, 0);

		delete this._iNewColPos;
	};

	/**
	 * starts the automatic column resize after doubleclick
	 * @experimental Experimental, only works with a limited control set
	 * @private
	 */
	Table.prototype._onAutomaticColumnResize = function(oEvent) {
		var oColumn = this.getColumns()[this._iLastHoveredColumnIndex];
		if (!oColumn.getAutoResizable()) {
			return;
		}

		jQuery.sap.log.debug("doubleclick fired");
		this._disableTextSelection();

		this.autoResizeColumn(this._iLastHoveredColumnIndex);

		oEvent.preventDefault();
		oEvent.stopPropagation();
	};

	/**
	 * Handler for the beginning of a column resizing.
	 * @private
	 */
	Table.prototype._onColumnResizeStart = function(oEvent) {
		this._bIsColumnResizerMoving = true;
		var $body = jQuery(document.body);
		this.$().addClass("sapUiTableResizing");
		if (this._isTouchMode(oEvent)) {
			this._iColumnResizeStart = oEvent.targetTouches[0].pageX;
			this._disableTextSelection();

			this._$colResize = jQuery("#" + this.getId() + "-rsz");

			$body.bind("touchmove.sapUiTableColumnResize", this._onColumnResize.bind(this));
			$body.bind("touchend.sapUiTableColumnResize", this._onColumnResized.bind(this));
		} else {
			// only resize on left click!
			if (oEvent.button === 0) {
				this._iColumnResizeStart = oEvent.pageX;

				this._disableTextSelection();
				this._$colResize = jQuery(oEvent.target);

				$body.bind("mousemove.sapUiTableColumnResize", this._onColumnResize.bind(this));
				$body.bind("mouseup.sapUiTableColumnResize", this._onColumnResized.bind(this));
			}
		}
	};

	/**
	 * Handler for the resizing of a column.
	 * @private
	 */
	Table.prototype._onColumnResize = function(oEvent) {
		var iLocationX;
		if (this._isTouchMode(oEvent)) {
			iLocationX = oEvent.targetTouches[0].pageX;
			oEvent.stopPropagation();
			oEvent.preventDefault();
		} else {
			iLocationX = oEvent.pageX;
		}

		if (this._iColumnResizeStart && iLocationX < this._iColumnResizeStart + 3 && iLocationX > this._iColumnResizeStart - 3) {
			return;
		}

		if (this._isTouchMode(oEvent)) {
			this._$colResize.addClass("sapUiTableColTouchRszActive");
		} else {
			this._$colResize.addClass("sapUiTableColRszActive");
		}

		var oColumn = this._getVisibleColumns()[this._iLastHoveredColumnIndex];
		var iDeltaX = iLocationX - this._iColumnResizeStart;
		var iColumnWidth = oColumn.$().width();

		var iWidth;
		if (this._bRtlMode) {
			iWidth = iColumnWidth - iDeltaX;
		} else {
			iWidth = iColumnWidth + iDeltaX;
		}

		iWidth = Math.max(iWidth, this._iColMinWidth);

		// calculate and set the position of the resize handle
		var iRszOffsetLeft = this.$().find(".sapUiTableCnt").offset().left;
		var iRszLeft = Math.floor((iLocationX - iRszOffsetLeft) - (this._$colResize.width() / 2));
		this._$colResize.css("left", iRszLeft + "px");

		// store the width of the column to apply later
		oColumn._iNewWidth = iWidth;
	};

	/**
	 * Handler for column resizing. If a resizing happens, the table will get invalidated.
	 * @private
	 */
	Table.prototype._onColumnResized = function(oEvent, iIndex) {
		var iColIndex;
		this._bIsColumnResizerMoving = false;
		this.$().removeClass("sapUiTableResizing");

		// ignore when no resize column is set
		if (!this._$colResize && (iIndex === null || iIndex === undefined)) {
			return;
		}
		// get the new width of the column
		if (iIndex === null || iIndex === undefined) {
			iColIndex = this._iLastHoveredColumnIndex;
		} else {
			iColIndex = iIndex;
		}

		var oColumn = this._getVisibleColumns()[iColIndex];

		// if the resize has started and we have a new width for the column
		// we apply it to the column object
		var bResized = false;
		if (oColumn._iNewWidth) {
			var sWidth;
			var iAvailableSpace = this.$().find(".sapUiTableCtrl").width();
			if (!this._checkPercentageColumnWidth()) {
				sWidth = oColumn._iNewWidth + "px";
			} else {
				var iColumnWidth = Math.round(100 / iAvailableSpace * oColumn._iNewWidth);
				sWidth = iColumnWidth + "%";
			}

			if (this._updateColumnWidth(oColumn, sWidth, true)) {
				this._resizeDependentColumns(oColumn, sWidth);
			}

			delete oColumn._iNewWidth;

			bResized = true;
		}

		// unbind the event handlers
		var $body = jQuery(document.body);
		$body.unbind("touchmove.sapUiTableColumnResize");
		$body.unbind("touchend.sapUiTableColumnResize");
		$body.unbind("mousemove.sapUiTableColumnResize");
		$body.unbind("mouseup.sapUiTableColumnResize");

		// focus the column
		oColumn.focus();

		// hide the text selection
		if (this._$colResize) {
			this._$colResize.removeClass("sapUiTableColTouchRszActive sapUiTableColRszActive");
			this._$colResize = undefined;
		}
		this._enableTextSelection();

		// rerender / ignore if nothing changed!
		if (bResized) {
			this.invalidate();
		}
	};

	/**
	 *
	 * @param oColumn
	 * @param sWidth
	 * @private
	 */
	Table.prototype._resizeDependentColumns = function(oColumn, sWidth) {
		var that = this;
		// Adjust columns only if the columns have percentage values
		if (this._checkPercentageColumnWidth()) {
			var aVisibleColumns = this._getVisibleColumns();
			//var oLastVisibleColumn = aVisibleColumns[aVisibleColumns.length - 1]; // NOT USED!
			//var bAllFollowingColumnsFlexible = true; // NOT USED!

			var iColumnIndex;
			jQuery.each(aVisibleColumns, function(iIndex, oCurrentColumn) {
				if (oColumn === oCurrentColumn) {
					iColumnIndex = iIndex;
				//} else if (iColumnIndex !== undefined && !oCurrentColumn.getFlexible()) { // NOT REQUIRED?
					//bAllFollowingColumnsFlexible = false;
				}
			});

			var iOthersWidth = 0;
			var iLastIndex = aVisibleColumns.length - 1;
			var iTotalPercentage;
			if (iColumnIndex === undefined) {
				iTotalPercentage = 0;
			} else {
				iTotalPercentage = parseInt(sWidth,10);
			}
			var iPercentages = 0;
			var aOtherColumns = [];

			jQuery.each(aVisibleColumns, function(iIndex, oCurrentColumn) {
				var iColumnPercentage = that._getColumnPercentageWidth(oCurrentColumn);
				if ((((iColumnIndex === iLastIndex && iIndex < iColumnIndex) || ((iColumnIndex !== iLastIndex) && iIndex > iColumnIndex)) && oCurrentColumn.getFlexible()) || iColumnIndex === undefined) {
					iOthersWidth += oCurrentColumn.$().outerWidth();
					iPercentages += iColumnPercentage;
					aOtherColumns.push(oCurrentColumn);
				} else if (iIndex !== iColumnIndex) {
					iTotalPercentage += iColumnPercentage;
				}
			});

			var iCalcPercentage = iTotalPercentage;
			jQuery.each(aOtherColumns, function(iIndex, oCurrentColumn){
				var iColumnPercentage = that._getColumnPercentageWidth(oCurrentColumn);
				var iNewWidth = Math.round((100 - iCalcPercentage) / iPercentages * iColumnPercentage);
				if (iIndex === aOtherColumns.length - 1) {
					iNewWidth = 100 - iTotalPercentage;
				} else {
					iTotalPercentage += iNewWidth;
				}
				that._updateColumnWidth(oCurrentColumn, iNewWidth + "%");
			});
		} else if (!this._hasOnlyFixColumnWidths()) {

			var aVisibleColumns = this._getVisibleColumns(),
				iAvailableSpace = this.$().find(".sapUiTableCtrl").width(),
				iColumnIndex,
				iRightColumns = 0,
				iLeftWidth = 0,
				iRightWidth = 0,
				iNonFixedColumns = 0;

			jQuery.each(aVisibleColumns, function(iIndex, oCurrentColumn) {
				//Check columns if they are fixed = they have a pixel width
				if (!jQuery.sap.endsWith(oCurrentColumn.getWidth(), "px")
					&& !jQuery.sap.endsWith(oCurrentColumn.getWidth(), "em")
					&& !jQuery.sap.endsWith(oCurrentColumn.getWidth(), "rem")) {
					iNonFixedColumns++;
					return false;
				}
				//if iColumnIndex is defined we already found our column and all other columns are right of that one
				if (iColumnIndex != undefined) {
					iRightWidth += that._CSSSizeToPixel(oCurrentColumn.getWidth());
					iRightColumns++;
				} else if (oColumn !== oCurrentColumn) {
					iLeftWidth += that._CSSSizeToPixel(oCurrentColumn.getWidth());
				}
				if (oColumn === oCurrentColumn) {
					iColumnIndex = iIndex;
					//Use new width of column
					iLeftWidth += that._CSSSizeToPixel(sWidth);
				}
			});
			//If there are non fixed columns we don't do this
			if (iNonFixedColumns > 0 || (iLeftWidth + iRightWidth > iAvailableSpace)) {
				return;
			}
			//Available space is all space right of the modified columns
			iAvailableSpace -= iLeftWidth;
			for (var i = iColumnIndex + 1; i < aVisibleColumns.length; i++) {
				//Calculate new column width based on previous percentage width
				var oColumn = aVisibleColumns[i],
					iColWidth = this._CSSSizeToPixel(oColumn.getWidth()),
					iPercent = iColWidth / iRightWidth * 100,
					iNewWidth = iAvailableSpace / 100 * iPercent;
				this._updateColumnWidth(oColumn, Math.round(iNewWidth) + 'px');
			}
		}
	};

	/**
	 *
	 * @param oColumn
	 * @returns {*}
	 * @private
	 */
	Table.prototype._getColumnPercentageWidth = function(oColumn) {
		var sColumnWidth = oColumn.getWidth();
		var iColumnPercentage = parseInt(oColumn.getWidth(),10);
		var iTotalWidth = this.$().find(".sapUiTableCtrl").width();
		if (jQuery.sap.endsWith(sColumnWidth, "px") || jQuery.sap.endsWith(sColumnWidth, "em") || jQuery.sap.endsWith(sColumnWidth, "rem")) {
			iColumnPercentage = Math.round(100 / iTotalWidth * iColumnPercentage);
		} else if (!jQuery.sap.endsWith(sColumnWidth, "%")) {
			iColumnPercentage = Math.round(100 / iTotalWidth * oColumn.$().width());
		}
		return iColumnPercentage;
	};

	/**
	 *
	 * @param oColumn
	 * @param sWidth
	 * @private
	 */
	Table.prototype._updateColumnWidth = function(oColumn, sWidth, bFireEvent) {
		// forward the event
		var bExecuteDefault = true;
		if (bFireEvent) {
			bExecuteDefault = this.fireColumnResize({
				column: oColumn,
				width: sWidth
			});
		}

		// set the width of the column (when not cancelled)
		if (bExecuteDefault) {
			oColumn.setProperty("width", sWidth, true);
			this.$().find('th[aria-owns="' + oColumn.getId() + '"]').css('width', sWidth);
		}

		return bExecuteDefault;
	};

	/**
	 * Check if at least one column has a percentage value
	 * @private
	 */
	Table.prototype._checkPercentageColumnWidth = function() {
		var aColumns = this.getColumns();
		var bHasPercentageColumns = false;
		jQuery.each(aColumns, function(iIndex, oColumn) {
			if (jQuery.sap.endsWith(oColumn.getWidth(), "%")) {
				bHasPercentageColumns = true;
				return false;
			}
		});
		return bHasPercentageColumns;
	};

	/**
	 * Check if table has only non flexible columns with fixed widths and only then
	 * the table adds a dummy column to fill the rest of the width instead of resizing
	 * the columns to fit the complete table width
	 * @private
	 */
	Table.prototype._hasOnlyFixColumnWidths = function() {
		var bOnlyFixColumnWidths = true;
		jQuery.each(this.getColumns(), function(iIndex, oColumn) {
			var sWidth = oColumn.getWidth();
			if (oColumn.getFlexible() || !sWidth || sWidth.substr(-2) !== "px") {
				bOnlyFixColumnWidths = false;
				return false;
			}
		});
		return bOnlyFixColumnWidths;
	};


	// =============================================================================
	// SORTING & FILTERING
	// =============================================================================

	/**
	 * pushes the sorted column to array
	 *
	 * @param {sap.ui.table.Column} oColumn
	 *         column to be sorted
	 * @param {Boolean} bAdd Set to true to add the new sort criterion to the existing sort criteria
	 * @type sap.ui.table.Table
	 * @private
	 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
	 */

	Table.prototype.pushSortedColumn = function(oColumn, bAdd) {

		if (!bAdd) {
			this._aSortedColumns = [];
		}

		this._aSortedColumns.push(oColumn);

	};

	/**
	 * gets sorted columns
	 *
	 * @return Array of sorted columns
	 * @public
	 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
	 */
	Table.prototype.getSortedColumns = function() {

		return this._aSortedColumns;

	};

	/**
	 * sorts the given column ascending or descending
	 *
	 * @param {sap.ui.table.Column} oColumn
	 *         column to be sorted
	 * @param {sap.ui.table.SortOrder} oSortOrder
	 *         sort order of the column (if undefined the default will be ascending)
	 * @param {Boolean} bAdd Set to true to add the new sort criterion to the existing sort criteria
	 * @type sap.ui.table.Table
	 * @public
	 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
	 */
	Table.prototype.sort = function(oColumn, oSortOrder, bAdd) {
		if (jQuery.inArray(oColumn, this.getColumns()) >= 0) {
			oColumn.sort(oSortOrder === sap.ui.table.SortOrder.Descending, bAdd);
		}
	};


	/**
	 * filter the given column by the given value
	 *
	 * @param {sap.ui.table.Column} oColumn
	 *         column to be filtered
	 * @param {string} sValue
	 *         filter value as string (will be converted)
	 * @type sap.ui.table.Table
	 * @public
	 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
	 */
	Table.prototype.filter = function(oColumn, sValue) {
		if (jQuery.inArray(oColumn, this.getColumns()) >= 0) {
			oColumn.filter(sValue);
		}
	};


	// =============================================================================
	// SELECTION HANDLING
	// =============================================================================

	Table.prototype._getSelectOnCellsAllowed = function () {
		var sSelectionBehavior = this.getSelectionBehavior();
		var sSelectionMode = this.getSelectionMode();
		return sSelectionMode !== sap.ui.table.SelectionMode.None && (sSelectionBehavior === sap.ui.table.SelectionBehavior.Row || sSelectionBehavior === sap.ui.table.SelectionBehavior.RowOnly);
	};

	/**
	 * updates the visual selection in the HTML markup
	 * @private
	 */
	Table.prototype._updateSelection = function() {
		if (this.getSelectionMode() === sap.ui.table.SelectionMode.None) {
			// there is no selection which needs to be updated. With the switch of the
			// selection mode the selection was cleared (and updated within that step)
			return;
		}

		// retrieve tooltip and aria texts only once and pass them to the rows _updateSelection function
		var mTooltipTexts = this._getAccExtension().getAriaTextsForSelectionMode(true);

		// check whether the row can be clicked to change the selection
		var bSelectOnCellsAllowed = this._getSelectOnCellsAllowed();

		// trigger the rows to update their selection
		var aRows = this.getRows();
		for (var i = 0; i < aRows.length; i++) {
			var oRow = aRows[i];
			oRow._updateSelection(this, mTooltipTexts, bSelectOnCellsAllowed);
		}
		// update internal property to reflect the correct index
		this.setProperty("selectedIndex", this.getSelectedIndex(), true);
	};


	/**
	 * notifies the selection listeners about the changed rows
	 * @private
	 */
	Table.prototype._onSelectionChanged = function(oEvent) {
		var aRowIndices = oEvent.getParameter("rowIndices");
		var iRowIndex = this._iSourceRowIndex !== undefined ? this._iSourceRowIndex : this.getSelectedIndex();
		this._updateSelection();
		var oSelMode = this.getSelectionMode();
		if (oSelMode === "Multi" || oSelMode === "MultiToggle") {
			this.$("selall").attr('title',this._oResBundle.getText("TBL_SELECT_ALL")).addClass("sapUiTableSelAll");
		}
		this.fireRowSelectionChange({
			rowIndex: iRowIndex,
			rowContext: this.getContextByIndex(iRowIndex),
			rowIndices: aRowIndices
		});
	};


	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */

	/**
	 * Returns the context of a row by its index. Please note that for server-based models like OData,
	 * the supplied index might not have been loaded yet. If the context is not available at the client,
	 * the binding will trigger a backend request and request this single context. Although this API
	 * looks synchronous it may not return a context but load it and fire a change event on the binding.
	 *
	 * For server-based models you should consider to only make this API call when the index is within
	 * the currently visible scroll area.
	 *
	 * @param {int} iIndex
	 *         Index of the row to return the context from.
	 * @type object
	 * @public
	 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
	 */
	Table.prototype.getContextByIndex = function(iIndex) {
		// TODO: ODataListBinding needs to make sure to prevent loading multiple times
		// index must not be smaller than 0! otherwise the ODataModel fails
		var oBinding = this.getBinding("rows");
		return iIndex >= 0 && oBinding ? oBinding.getContexts(iIndex, 1)[0] : null;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.getSelectedIndex = function() {
		return this._oSelection.getLeadSelectedIndex();
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.setSelectedIndex = function(iIndex) {
		if (iIndex === -1) {
			//If Index eq -1 no item is selected, therefore clear selection is called
			//SelectionModel doesn't know that -1 means no selection
			this.clearSelection();
		} else {
			this._oSelection.setSelectionInterval(iIndex, iIndex);
		}
		return this;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */

	/**
	 * Removes complete selection.
	 *
	 * @type sap.ui.table.Table
	 * @public
	 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
	 */
	Table.prototype.clearSelection = function() {
		this._oSelection.clearSelection();
		return this;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */

	/**
	 * Add all rows to the selection.
	 * Please note that for server based models like OData the indices which are considered to be selected might not
	 * be available at the client yet. Calling getContextByIndex might not return a result but trigger a roundtrip
	 * to request this single entity.
	 *
	 * @return sap.ui.table.Table
	 * @public
	 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
	 */
	Table.prototype.selectAll = function() {
		var oSelMode = this.getSelectionMode();
		if (!this.getEnableSelectAll() || (oSelMode != "Multi" && oSelMode != "MultiToggle")) {
			return this;
		}
		var oBinding = this.getBinding("rows");
		if (oBinding) {
			// first give the higher number. The toIndex will be used as leadIndex. It more likely that
			// in oData case the index 0 is already loaded than that the last index is loaded. The leadIndex will
			// be used to determine the leadContext in the selectionChange event. If not yet loaded it would need to
			// be request. To avoid unnecessary roundtrips the lead index is set to 0.
			this._oSelection.setSelectionInterval((oBinding.getLength() || 0) - 1, 0);
			this.$("selall").attr('title',this._oResBundle.getText("TBL_DESELECT_ALL")).removeClass("sapUiTableSelAll");
		}
		return this;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */

	/**
	 * Zero-based indices of selected items, wrapped in an array. An empty array means "no selection".
	 *
	 * @return int[]
	 * @public
	 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
	 */
	Table.prototype.getSelectedIndices = function() {
		return this._oSelection.getSelectedIndices();
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */

	/**
	 * Adds the given selection interval to the selection. In case of single selection the "indexTo" value will be used for as selected index.
	 *
	 * @param {int} iIndexFrom
	 *         Index from which .
	 * @param {int} iIndexTo
	 *         Indices of the items that shall additionally be selected.
	 * @type sap.ui.table.Table
	 * @public
	 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
	 */
	Table.prototype.addSelectionInterval = function(iIndexFrom, iIndexTo) {
		this._oSelection.addSelectionInterval(iIndexFrom, iIndexTo);
		return this;
	};

	/**
	 * Sets the given selection interval as selection. In case of single selection the "indexTo" value will be used for as selected index.
	 *
	 * @param {int} iIndexFrom
	 *         Index from which .
	 * @param {int} iIndexTo
	 *         Indices of the items that shall additionally be selected.
	 * @type sap.ui.table.Table
	 * @public
	 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
	 */
	Table.prototype.setSelectionInterval = function(iIndexFrom, iIndexTo) {
		this._oSelection.setSelectionInterval(iIndexFrom, iIndexTo);
		return this;
	};

	/**
	 * Removes the given selection interval from the selection. In case of single selection this call removeSelectedIndex with the "indexTo" value.
	 *
	 * @param {int} iIndexFrom
	 *         Index from which .
	 * @param {int} iIndexTo
	 *         Indices of the items that shall additionally be selected.
	 * @type sap.ui.table.Table
	 * @public
	 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
	 */
	Table.prototype.removeSelectionInterval = function(iIndexFrom, iIndexTo) {
		this._oSelection.removeSelectionInterval(iIndexFrom, iIndexTo);
		return this;
	};

	/**
	 * Returns whether the given index is selected.
	 *
	 * @param {int} iIndex
	 *         Index which is checked for selection state.
	 * @type boolean
	 * @public
	 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
	 */
	Table.prototype.isIndexSelected = function(iIndex) {
		return this._oSelection.isSelectedIndex(iIndex);
	};


	// =============================================================================
	// KEYBOARD HANDLING HELPERS
	// =============================================================================

	/**
	 * scrolls down a single row
	 * @private
	 */
	Table.prototype._scrollNext = function() {
		// we are at the end => scroll one down if possible
		if (this.getFirstVisibleRow() < this._getRowCount() - this.getVisibleRowCount()) {
			this.setFirstVisibleRow(Math.min(this.getFirstVisibleRow() + 1, this._getRowCount() - this.getVisibleRowCount()));
		}
	};

	/**
	 * scrolls up a single row
	 * @private
	 */
	Table.prototype._scrollPrevious = function() {
		// we are at the beginning => scroll one up if possible
		if (this.getFirstVisibleRow() > 0) {
			this.setFirstVisibleRow(Math.max(this.getFirstVisibleRow() - 1, 0));
		}
	};

	/**
	 * scrolls down a up page
	 * @private
	 */
	Table.prototype._scrollPageUp = function() {
		this.setFirstVisibleRow(Math.max(this.getFirstVisibleRow() - this.getVisibleRowCount(), 0));
	};

	/**
	 * scrolls down a complete page
	 * @private
	 */
	Table.prototype._scrollPageDown = function() {
		this.setFirstVisibleRow(Math.min(this.getFirstVisibleRow() + this.getVisibleRowCount() - this.getFixedBottomRowCount(), this._getRowCount() - this.getVisibleRowCount()));
	};

	/**
	 * checks if the current target domref is in the first row of the table
	 * @private
	 */
	Table.prototype._isTopRow = function(oEvent) {
		var $target = jQuery(oEvent.target);
		var iRowIndex = parseInt($target.add($target.parent()).filter("[data-sap-ui-rowindex]").attr("data-sap-ui-rowindex"), 10);
		var iFixedRows = this.getFixedRowCount();
		if (iFixedRows > 0 && iRowIndex >= iFixedRows) {
			return iRowIndex === iFixedRows;
		}
		return iRowIndex === 0;
	};

	/**
	 * checks if the current target domref is in the last row of the table
	 * @private
	 */
	Table.prototype._isBottomRow = function(oEvent) {
		var $target = jQuery(oEvent.target);
		var iRowIndex = parseInt($target.add($target.parent()).filter("[data-sap-ui-rowindex]").attr("data-sap-ui-rowindex"), 10);
		var iFixedRows = this.getFixedBottomRowCount();
		if (iFixedRows > 0 && iRowIndex <= this.getVisibleRowCount() - 1 - iFixedRows) {
			return iRowIndex === this.getVisibleRowCount() - 1 - iFixedRows;
		}
		return iRowIndex === this.getVisibleRowCount() - 1;
	};

	/**
	 * enters the action mode. in the action mode the user can navigate through the
	 * interactive controls of the table by using the TAB & SHIFT-TAB. this table is
	 * aligned with the official WAI-ARIA 1.0.
	 * @private
	 */
	Table.prototype._enterActionMode = function($Focusable) {
		// only enter the action mode when not already in action mode and:
		if ($Focusable.length > 0 && !this._bActionMode) {

			//If cell has no tabbable element, we don't do anything
			if ($Focusable.filter(":sapTabbable").length == 0) {
				return;
			}

			// in the action mode we need no item navigation
			this._bActionMode = true;
			this.removeDelegate(this._oItemNavigation);

			// remove the tab index from the item navigation
			jQuery(this._oItemNavigation.getFocusedDomRef()).attr("tabindex", "-1");

			// set the focus to the active control
			$Focusable.filter(":sapTabbable").eq(0).focus();
		}
	};

	/**
	 * leaves the action mode and enters the navigation mode. in the navigation mode
	 * the user can navigate through the cells of the table by using the arrow keys,
	 * page up & down keys, home and end keys. this table is aligned with the
	 * official WAI-ARIA 1.0.
	 * @private
	 */
	Table.prototype._leaveActionMode = function(oEvent) {

	 // TODO: update ItemNavigation position otherwise the position is strange!
	 //        EDIT AN SCROLL!

		if (this._bActionMode) {

			// in the navigation mode we use the item navigation
			this._bActionMode = false;
			this.addDelegate(this._oItemNavigation);

			// reset the tabindex of the focused domref of the item navigation
			jQuery(this._oItemNavigation.getFocusedDomRef()).attr("tabindex", "0");

			// when we have an event which is responsible to leave the action mode
			// we search for the closest
			if (oEvent) {
				if (jQuery(oEvent.target).closest("td[tabindex='-1']").length > 0) {
					// triggered when clicking into a cell, then we focus the cell
					var iIndex = jQuery(this._oItemNavigation.aItemDomRefs).index(jQuery(oEvent.target).closest("td[tabindex='-1']").get(0));
					this._oItemNavigation.focusItem(iIndex, null);
				} else {
					// somewhere else means whe check if the click happend inside
					// the container, then we focus the last focused element
					// (DON'T KNOW IF THIS IS OK - but we don't know where the focus was!)
					if (jQuery.sap.containsOrEquals(this.$().find(".sapUiTableCCnt").get(0), oEvent.target)) {
						this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex(), null);
					}
				}
			} else {
				// when no event is given we just focus the last focused index
				this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex(), null);
			}

		}

	};

	/**
	 * Return the focused row index.
	 * @return {int} the currently focused row index.
	 * @private
	 */
	Table.prototype._getFocusedRowIndex = function() {
		var iFocusedIndex = this._oItemNavigation.iFocusedIndex;
		var iColumns = this._oItemNavigation.iColumns;
		var iSelectedCellInRow = iFocusedIndex % iColumns;
		var iSelectedRow = this.getFirstVisibleRow() + (iFocusedIndex - iSelectedCellInRow) / iColumns;

		if (!this.getColumnHeaderVisible()) {
			iSelectedRow++;
		}
		return iSelectedRow - 1;
	};

	/**
	 * Checks whether the row of the currently focused cell is selected or not.
	 * @return {boolean} true or false
	 * @private
	 */
	Table.prototype._isFocusedRowSelected = function() {
		var iSelectedRow = this._getFocusedRowIndex();
		var bIsFocusedRowSelected = this.isIndexSelected(iSelectedRow);

		var bIsCellRowHeader = (this._oItemNavigation.iFocusedIndex % this._oItemNavigation.iColumns == 0);
		if (bIsCellRowHeader) {
			return bIsFocusedRowSelected;
		} else {
			var bHasRowHeader = this.getSelectionMode() !== sap.ui.table.SelectionMode.None && this.getSelectionBehavior() !== sap.ui.table.SelectionBehavior.RowOnly;
			if (bHasRowHeader) {
				return null;
			} else {
				return bIsFocusedRowSelected;
			}
		}
	};

	// =============================================================================
	// KEYBOARD HANDLING EVENTS
	// =============================================================================

	// FYI: two more relevant things are handled in the onclick and onfocusin event

	/**
	 * handle the row selection via SPACE or ENTER key if key is pressed on a group header, the open state is toggled
	 * @private
	 */
	Table.prototype.onkeyup = function(oEvent) {
		if (!this._bEventSapSelect === true) {
			return;
		}

		this._bEventSapSelect = false;

		// this mimics the sapselect event but on keyup
		if (oEvent.keyCode !== jQuery.sap.KeyCodes.ENTER &&
			oEvent.keyCode !== jQuery.sap.KeyCodes.SPACE &&
			oEvent.keyCode !== jQuery.sap.KeyCodes.F4 ||
			oEvent.srcControl !== this &&
			jQuery.inArray(oEvent.srcControl,this.getRows()) === -1 &&
			jQuery.inArray(oEvent.srcControl,this.getColumns()) === -1) {
			return;
		}
		var $Parent = jQuery(oEvent.target).closest('.sapUiTableGroupHeader');
		if ($Parent.length > 0) {
			var iRowIndex = this.getFirstVisibleRow() + parseInt($Parent.attr("data-sap-ui-rowindex"), 10);
			var oBinding = this.getBinding("rows");
			if (oBinding) {
				if (oBinding.isExpanded(iRowIndex)) {
					oBinding.collapse(iRowIndex);
				} else {
					oBinding.expand(iRowIndex);
				}
			}
			oEvent.preventDefault();
			return;
		}
		this._bShowMenu = true;
		this._onSelect(oEvent);
		this._bShowMenu = false;
		oEvent.preventDefault();
	};

	/**
	 * @private
	 */
	Table.prototype.onsapselect = function() {
		this._bEventSapSelect = true;
	};

	/**
	 * @private
	 */
	Table.prototype.onsapselectmodifiers = function() {
		this._bEventSapSelect = true;
	};

	Table.prototype.onsapspace = function(oEvent) {
		var $target = jQuery(oEvent.target);
		if (((this.getSelectionBehavior() == sap.ui.table.SelectionBehavior.Row || this.getSelectionBehavior() == sap.ui.table.SelectionBehavior.RowOnly) && oEvent.srcControl instanceof sap.ui.table.Row) ||
			$target.hasClass("sapUiTableRowHdr") || $target.hasClass("sapUiTableColRowHdr") || $target.hasClass("sapUiTableCol")) {
			oEvent.preventDefault();
		}
	};

	/**
	 * handle the row selection via SPACE or ENTER key
	 * @private
	 */
	Table.prototype.onkeydown = function(oEvent) {
		var $this = this.$();

		if (!this._bActionMode &&
			oEvent.keyCode == jQuery.sap.KeyCodes.F2 ||
			oEvent.keyCode == jQuery.sap.KeyCodes.ENTER) {
			if ($this.find(".sapUiTableCtrl td:focus").length > 0) {
				this._enterActionMode($this.find(".sapUiTableCtrl td:focus").find(":sapFocusable"));
				oEvent.preventDefault();
				oEvent.stopPropagation();
			}
		} else if (this._bActionMode &&
			oEvent.keyCode == jQuery.sap.KeyCodes.F2) {
			this._leaveActionMode(oEvent);
		} else if (oEvent.keyCode == jQuery.sap.KeyCodes.TAB && this._bActionMode) {
			//Set tabindex to second table if fixed columns are used
			if (this.getFixedColumnCount() > 0) {
				var $cell = jQuery(oEvent.target);
				if ($cell.is("td[role=gridcell]") == false) {
					$cell = $cell.parents("td[role=gridcell]");
				}
				var $row = $cell.parent("tr[data-sap-ui-rowindex]");
				var $table = $row.closest(".sapUiTableCtrl");
				var iRowIndex = parseInt($row.attr("data-sap-ui-rowindex"),10);
				var $cells = $row.find("td[role=gridcell]");
				var iColIndex = $cells.index($cell);
				var iTableCols = $cells.length;
				if (iColIndex === (iTableCols - 1)) {
					var $otherTable;
					if ($table.hasClass("sapUiTableCtrlFixed")) {
						$otherTable = $this.find(".sapUiTableCtrl.sapUiTableCtrlScroll");
					} else {
						$otherTable = $this.find(".sapUiTableCtrl.sapUiTableCtrlFixed");
						iRowIndex++;
						if (iRowIndex == this.getVisibleRowCount()) {
							iRowIndex = 0;
						}
					}
					var $otherRow = $otherTable.find("tr[data-sap-ui-rowindex='" + iRowIndex + "']");
					var $nextFocus = $otherRow.find("td :sapFocusable[tabindex='0']").first();
					if ($nextFocus.length > 0) {
						$nextFocus.focus();
						oEvent.preventDefault();
					}
				}
			}
		} else if (oEvent.keyCode == jQuery.sap.KeyCodes.A && (oEvent.metaKey || oEvent.ctrlKey)) {
			// CTRL + A handling
			var oIN = this._oItemNavigation;
			var iFocusedIndex = oIN.getFocusedIndex();

			this._toggleSelectAll();

			oIN.focusItem(iFocusedIndex, oEvent);

			oEvent.preventDefault();
			oEvent.stopImmediatePropagation(true);
		} else if (oEvent.keyCode === jQuery.sap.KeyCodes.F10 && (oEvent.shiftKey)) {
			// SHIFT + 10 should open the context menu
			this.oncontextmenu(oEvent);
		}
	};

	/**
	 * handle the ESCAPE key to leave the action mode
	 * @private
	 */
	Table.prototype.onsapescape = function(oEvent) {
		this._leaveActionMode(oEvent);
	};

	/**
	 * handle the SHIFT-TAB key
	 * <ul>
	 *   <li>Navigation Mode:
	 *      <ul>
	 *          <li>If focus is on header: jump to the next focusable control before the table</li>
	 *          <li>If focus in on content: jump to header for the current column</li>
	 *      </ul>
	 *   <li>Action Mode: switch back to navigation mode</li>
	 * </ul>
	 * @private
	 */
	Table.prototype.onsaptabprevious = function(oEvent) {
		var $this = this.$();
		if (this._bActionMode) {
			this._leaveActionMode();
			oEvent.preventDefault();
		} else {
			var oIN = this._oItemNavigation;
			var bNoData = this.$().hasClass("sapUiTableEmpty");
			var oSapUiTableCCnt = $this.find('.sapUiTableCCnt')[0];
			var bFocusFromTableContent = jQuery.contains(oSapUiTableCCnt, oEvent.target);

			if (bFocusFromTableContent && this.getColumnHeaderVisible()) {
				// Focus comes from table content. Focus the column header which corresponds to the
				// selected column (column index)
				var iColumn = oIN.getFocusedIndex() % oIN.iColumns;
				oIN.focusItem(iColumn, oEvent);
				oEvent.preventDefault();
			} else if (oIN.getFocusedDomRef() === oEvent.target && jQuery.sap.containsOrEquals(oSapUiTableCCnt, oEvent.target) ||
				(!this.getColumnHeaderVisible() && bNoData && bFocusFromTableContent)) {
				// in case of having the focus in the row or column header we do not need to
				// place the focus to the div before the table control because there we do
				// not need to skip the table controls anymore.
				this._bIgnoreFocusIn = true;
				$this.find(".sapUiTableCtrlBefore").focus();
				this._bIgnoreFocusIn = false;
			}
		}
	};

	/**
	 * handle the TAB key:
	 * <ul>
	 *   <li>Navigation Mode:
	 *      <ul>
	 *          <li>If focus is on header: jump to the first data column of the focused column header</li>
	 *          <li>If focus in on content: jump to the next focusable control after the table</li>
	 *      </ul>
	 *   <li>Action Mode: switch back to navigation mode</li>
	 * </ul>
	 * @private
	 */
	Table.prototype.onsaptabnext = function(oEvent) {
		var $this = this.$();
		if (this._bActionMode) {
			this._leaveActionMode();
			oEvent.preventDefault();
		} else {
			var oIN = this._oItemNavigation;
			var bContainsColHdrCnt = jQuery.contains($this.find('.sapUiTableColHdrCnt')[0], oEvent.target);
			var bNoData = this.$().hasClass("sapUiTableEmpty");

			if (bContainsColHdrCnt && !bNoData) {
				oIN.focusItem(oIN.getFocusedIndex() + oIN.iColumns * this._iLastSelectedDataRow, oEvent);
				oEvent.preventDefault();
			} else if (oIN.getFocusedDomRef() === oEvent.target || (bNoData && bContainsColHdrCnt)) {
				this._bIgnoreFocusIn = true;
				$this.find(".sapUiTableCtrlAfter").focus();
				this._bIgnoreFocusIn = false;
			}
		}
	};


	/**
	 * dynamic scrolling when reaching the bottom row with the ARROW DOWN key
	 * @private
	 */
	Table.prototype.onsapdown = function(oEvent) {
		if (!this._bActionMode && this._isBottomRow(oEvent)) {
			if (this.getFirstVisibleRow() != this._getRowCount() - this.getVisibleRowCount()) {
				oEvent.stopImmediatePropagation(true);
				if (this.getNavigationMode() === sap.ui.table.NavigationMode.Scrollbar) {
					this._scrollNext();
				} else {
					this._scrollPageDown();
				}
			}
		}
		oEvent.preventDefault();
	};

	/**
	 * Implements selecting/deselecting rows when pressing SHIFT + DOWN
	 * @private
	 */
	Table.prototype.onsapdownmodifiers = function(oEvent) {
		if (oEvent.shiftKey) {
			var iFocusedRow = this._getFocusedRowIndex();
			var bIsFocusedRowSelected = this._isFocusedRowSelected();
			if (bIsFocusedRowSelected === true) {
				this.addSelectionInterval(iFocusedRow + 1, iFocusedRow + 1);
			} else if (bIsFocusedRowSelected === false) {
				this.removeSelectionInterval(iFocusedRow + 1, iFocusedRow + 1);
			}

			if (this._isBottomRow(oEvent)) {
				this._scrollNext();
			}
		} else if (oEvent.altKey) {
			// Toggle group header on ALT + DOWN.
			this._toggleGroupHeader(oEvent);
		}
	};

	/**
	 * Implements selecting/deselecting rows when pressing SHIFT + UP
	 *
	 * @private
	 */
	Table.prototype.onsapupmodifiers = function(oEvent) {
		if (oEvent.shiftKey) {
			var iFocusedRow = this._getFocusedRowIndex();
			var bIsFocusedRowSelected = this._isFocusedRowSelected();

			if (bIsFocusedRowSelected === true) {
				this.addSelectionInterval(iFocusedRow - 1, iFocusedRow - 1);
			} else if (bIsFocusedRowSelected === false) {
				this.removeSelectionInterval(iFocusedRow - 1, iFocusedRow - 1);
			}

			if (this._isTopRow(oEvent)) {
				// Prevent that focus jumps to header in this case.
				if (this.getFirstVisibleRow() != 0) {
					oEvent.stopImmediatePropagation(true);
				}
				this._scrollPrevious();
			}
		} else if (oEvent.altKey) {
			// Toggle group header on ALT + UP.
			this._toggleGroupHeader(oEvent);
		}
	};

	/**
	 * dynamic scrolling when reaching the top row with the ARROW UP key
	 *
	 * @private
	 */
	Table.prototype.onsapup = function(oEvent) {
		if (!this._bActionMode && this._isTopRow(oEvent)) {
			if (this.getFirstVisibleRow() != 0) {
				oEvent.stopImmediatePropagation(true);
			}
			if (this.getNavigationMode() === sap.ui.table.NavigationMode.Scrollbar) {
				this._scrollPrevious();
			} else {
				this._scrollPageUp();
			}
		}
		oEvent.preventDefault();
	};

	/**
	 * dynamic scrolling when reaching the bottom row with the PAGE DOWN key
	 * @private
	 */
	Table.prototype.onsappagedown = function(oEvent) {
		if (!this._bActionMode) {
			var $this = this.$();
			var oIN = this._oItemNavigation;

			var bRowHeader = (this.getSelectionBehavior() !== sap.ui.table.SelectionBehavior.RowOnly);
			var iHeaderRows = $this.find(".sapUiTableColHdrScr>.sapUiTableColHdr").length;

			// Check if focus is on header
			// Special Handling is required here:
			// - If not in the last header row, jump to the last header row in the same column
			// - If in the last header row, scroll table to first row and jump to first row, same column
			if (this.getColumnHeaderVisible() && oIN.iFocusedIndex < (oIN.iColumns * iHeaderRows)) {
				// focus is on header
				var iCol = oIN.iFocusedIndex % oIN.iColumns;
				if ((oIN.iFocusedIndex <= (oIN.iColumns * iHeaderRows) && oIN.iFocusedIndex >= (oIN.iColumns * iHeaderRows) - oIN.iColumns) ||
					(iCol === 0 && bRowHeader)) {
					// move focus to first data row, scroll table to top
					this.setFirstVisibleRow(0);
					oIN.focusItem(oIN.iColumns * iHeaderRows + iCol, oEvent);
				} else {
					// set focus to last header row, same column if possible
					oIN.focusItem(oIN.iColumns * iHeaderRows - oIN.iColumns + iCol, oEvent);
				}

				oEvent.stopImmediatePropagation(true);
			} else {
				if (this._isBottomRow(oEvent)) {
					this._scrollPageDown();
				}

				var iFixedBottomRowsOffset = this.getFixedBottomRowCount();
				if (this.getFirstVisibleRow() === this._getRowCount() - this.getVisibleRowCount()) {
					iFixedBottomRowsOffset = 0;
				}

				var iRowCount = (oIN.aItemDomRefs.length / oIN.iColumns) - iFixedBottomRowsOffset;
				var iCol = oIN.iFocusedIndex % oIN.iColumns;
				var iIndex = (iRowCount - 1) * oIN.iColumns + iCol;

				oIN.focusItem(iIndex, oEvent);

				oEvent.stopImmediatePropagation(true);
			}
			oEvent.preventDefault();
		}
	};

	/**
	 * dynamic scrolling when reaching the top row with the PAGE DOWN key
	 * @private
	 */
	Table.prototype.onsappagedownmodifiers = function(oEvent) {
		if (!this._bActionMode && oEvent.altKey) {
			var oIN = this._oItemNavigation;
			var bRowHeader = (this.getSelectionBehavior() !== sap.ui.table.SelectionBehavior.RowOnly);

			var iCol = oIN.iFocusedIndex % oIN.iColumns;
			var iNewCol;
			if (iCol == 0 && bRowHeader) {
				iNewCol = 1;
			} else {
				var iVisibleColumns = this._aVisibleColumns.length;
				var iMaxIndex = this._getVisibleColumns().length;
				if (!bRowHeader) {
					iMaxIndex--;
				}
				if (iVisibleColumns === 0) {
					iNewCol = iMaxIndex;
				} else {
					iNewCol = Math.min(iMaxIndex, iCol + iVisibleColumns);
				}
			}
			oIN.focusItem(oIN.iFocusedIndex - (iCol - iNewCol), oEvent);
			oEvent.stopImmediatePropagation(true);
			oEvent.preventDefault();
		}
	};

	/**
	 * dynamic scrolling when reaching the top row with the PAGE UP key
	 * @private
	 */
	Table.prototype.onsappageup = function(oEvent) {
		if (!this._bActionMode) {
			var $this = this.$();
			var oIN = this._oItemNavigation;

			var bRowHeader = (this.getSelectionBehavior() !== sap.ui.table.SelectionBehavior.RowOnly);
			var iHeaderRows = $this.find(".sapUiTableColHdrScr>.sapUiTableColHdr").length;
			var iCol = oIN.iFocusedIndex % oIN.iColumns;

			if (this.getColumnHeaderVisible() && oIN.iFocusedIndex < (oIN.iColumns * iHeaderRows)) {
				// focus is on header
				if (oIN.iFocusedIndex > oIN.iColumns) {
					// focus is not on the first header row, move to first
					oIN.focusItem(iCol, oEvent);
				}
				oEvent.stopImmediatePropagation(true);
			} else {
				// focus is on content area
				if (this.getColumnHeaderVisible() && this.getFirstVisibleRow() == 0 && this._isTopRow(oEvent)) {
					// focus is on first row, move to last header row, same column
					if (bRowHeader && iCol === 0) {
						oIN.focusItem(iCol, oEvent);
					} else {
						oIN.focusItem(oIN.iColumns * iHeaderRows - oIN.iColumns + iCol, oEvent);
					}
					oEvent.stopImmediatePropagation(true);
				} else {
					var iIndex = this.getColumnHeaderVisible() ? oIN.iColumns * iHeaderRows : 0;
					oIN.focusItem(iIndex + iCol, oEvent);
					oEvent.stopImmediatePropagation(true);

					if (this._isTopRow(oEvent)) {
						this._scrollPageUp();
					}
				}
			}

			oEvent.preventDefault();
		}
	};

	/**
	 * dynamic scrolling when reaching the top row with the PAGE UP key
	 * @private
	 */
	Table.prototype.onsappageupmodifiers = function(oEvent) {
		if (!this._bActionMode && oEvent.altKey) {
			var oIN = this._oItemNavigation;
			var bRowHeader = (this.getSelectionBehavior() !== sap.ui.table.SelectionBehavior.RowOnly);

			var iCol = oIN.iFocusedIndex % oIN.iColumns;
			if (iCol > 0) {
				var iNewCol;
				if (iCol == 1 && bRowHeader) {
					iNewCol = 0;
				} else {
					var iVisibleColumns = this._aVisibleColumns.length;
					if (iVisibleColumns === 0) {
						if (bRowHeader) {
							iNewCol = 1;
						} else {
							iNewCol = 0;
						}
					} else {
						var iMin = 1;
						if (!bRowHeader) {
							iMin = 0;
						}
						iNewCol = Math.max(iMin, iCol - iVisibleColumns);
					}
				}
				oIN.focusItem(oIN.iFocusedIndex - (iCol - iNewCol), oEvent);
			}
			oEvent.stopImmediatePropagation(true);
			oEvent.preventDefault();
		}
	};

	/**
	 * Keyboard Handling regarding HOME key
	 *
	 * @private
	 */
	Table.prototype.onsaphome = function(oEvent) {
		var bIsRowOnly = (this.getSelectionBehavior() == sap.ui.table.SelectionBehavior.RowOnly);

		// If focus is on a group header, do nothing.
		var bIsGroupCell = jQuery(oEvent.target).parents(".sapUiTableGroupHeader").length > 0;
		if (bIsGroupCell) {
			oEvent.stopImmediatePropagation(true);
			return;
		}

		var iFocusedIndex = this._oItemNavigation.iFocusedIndex;
		var iColumns = this._oItemNavigation.iColumns;
		var iSelectedCellInRow = iFocusedIndex % iColumns;

		var offset = 0;
		if (!bIsRowOnly) {
			offset = 1;
		}

		if (iSelectedCellInRow > this.getFixedColumnCount() + offset) {
			// If there is a fixed column, stop right of it.
			oEvent.stopImmediatePropagation(true);
			this._oItemNavigation.focusItem(iFocusedIndex - iSelectedCellInRow + this.getFixedColumnCount() + offset, null);
		} else if (!bIsRowOnly) {
			if (iSelectedCellInRow > 1) {
				// if focus is anywhere in the row, move focus to the first column cell.
				oEvent.stopImmediatePropagation(true);
				this._oItemNavigation.focusItem(iFocusedIndex - iSelectedCellInRow + 1, null);
			} else if (iSelectedCellInRow == 1) {
				// if focus is on first cell, move focus to row header.
				oEvent.stopImmediatePropagation(true);
				this._oItemNavigation.focusItem(iFocusedIndex - 1, null);
			} else {
				// If focus is on selection cell, do nothing.
				oEvent.stopImmediatePropagation(true);
			}
		}
	};

	/**
	 * Keyboard Handling regarding END key
	 *
	 * @private
	 */
	Table.prototype.onsapend = function(oEvent) {
		// If focus is on a group header, do nothing.
		var bIsGroupCell = jQuery(oEvent.target).parents(".sapUiTableGroupHeader").length > 0;
		if (bIsGroupCell) {
			oEvent.stopImmediatePropagation(true);
			return;
		}

		// If focus is on a selection cell, move focus to the first cell of the same row.
		var iFocusedIndex = this._oItemNavigation.iFocusedIndex;
		var iColumns = this._oItemNavigation.iColumns;
		var iSelectedCellInRow = iFocusedIndex % iColumns;

		var bIsRowOnly = (this.getSelectionBehavior() !== sap.ui.table.SelectionBehavior.RowOnly);
		var offset = 0;
		if (!bIsRowOnly) {
			offset = 1;
		}

		if (iSelectedCellInRow === 0 && bIsRowOnly) {
			// If focus is in row header, select first cell in same row.
			oEvent.stopImmediatePropagation(true);
			this._oItemNavigation.focusItem(iFocusedIndex + 1, null);
		} else if (iSelectedCellInRow < this.getFixedColumnCount() - offset) {
			// if their is a fixed column, stop left of it.
			oEvent.stopImmediatePropagation(true);
			this._oItemNavigation.focusItem(iFocusedIndex - iSelectedCellInRow + this.getFixedColumnCount() - offset, null);
		}
	};

	/**
	 * dynamic scrolling when using CTRL + HOME key
	 *
	 * @private
	 */
	Table.prototype.onsaphomemodifiers = function(oEvent) {
		if (oEvent.metaKey || oEvent.ctrlKey) {
			var $this = this.$();

			// Is target a table header cell
			var oTableHeader = $this.find(".sapUiTableColHdrCnt")[0];
			var bIsTableHeaderCell = jQuery.contains(oTableHeader, oEvent.target);

			// If focus is on a group header, do nothing.
			if (bIsTableHeaderCell) {
				oEvent.stopImmediatePropagation(true);
				return;
			}

			var iFocusedIndex = this._oItemNavigation.iFocusedIndex;
			var iColumns = this._oItemNavigation.iColumns;
			var iSelectedRowInColumn = Math.ceil(iFocusedIndex / iColumns) - 1;
			var iSelectedCellInRow = iFocusedIndex % iColumns;

			if (this.getColumnHeaderVisible()) {
				if (iSelectedRowInColumn == 1) {
					// if focus is in first row, select corresponding header
					oEvent.stopImmediatePropagation(true);
					this._oItemNavigation.focusItem(iSelectedCellInRow, oEvent);
				} else if (iSelectedRowInColumn > 1) {
					oEvent.stopImmediatePropagation(true);

					// if focus is in any row, select first cell row
					this.setFirstVisibleRow(0);

					var iTargetIndex = iSelectedCellInRow + iColumns;
					this._oItemNavigation.focusItem(iTargetIndex, oEvent);
				}
			} else {
				oEvent.stopImmediatePropagation(true);

				// if focus is in any row, select first cell row
				this.setFirstVisibleRow(0);

				var iTargetIndex = iFocusedIndex - iSelectedRowInColumn * iColumns;
				this._oItemNavigation.focusItem(iTargetIndex, oEvent);
			}
		}
	};

	/**
	 * dynamic scrolling when using CTRL + END key
	 *
	 * @private
	 */
	Table.prototype.onsapendmodifiers = function(oEvent) {
		if (oEvent.metaKey || oEvent.ctrlKey) {
			var $this = this.$();

			// Is target a table header cell
			var oTableHeader = $this.find(".sapUiTableColHdrCnt")[0];
			var bIsTableHeaderCell = jQuery.contains(oTableHeader, oEvent.target);

			var iFocusedIndex = this._oItemNavigation.iFocusedIndex;
			var iColumns = this._oItemNavigation.iColumns;
			var iSelectedCellInRow = iFocusedIndex % iColumns;

			oEvent.stopImmediatePropagation(true);

			if (bIsTableHeaderCell) {
				// If focus is on a group header, select first cell row after header.
				this._oItemNavigation.focusItem(iFocusedIndex + iColumns, oEvent);
			} else {
				// if focus is on any cell row, select last cell row.
				this.setFirstVisibleRow(this._getRowCount() - this.getVisibleRowCount());
				var iTargetIndex = this._oItemNavigation.aItemDomRefs.length - (iColumns - iSelectedCellInRow);
				this._oItemNavigation.focusItem(iTargetIndex, oEvent);
			}
		}
	};

	/**
	 * Default handler for sapleft event.
	 * @private
	 */
	Table.prototype.onsapleft = function(oEvent) {
		this._collapseGroupHeader(oEvent);
	};

	/**
	 * Default handler for sapright event.
	 * @private
	 */
	Table.prototype.onsapright = function(oEvent) {
		this._expandGroupHeader(oEvent);
	};


	/**
	 * If focus is on group header, open/close the group header, depending on the expand state.
	 * @private
	 */
	Table.prototype._toggleGroupHeader = function(oEvent) {
		var $Parent = jQuery(oEvent.target).closest('.sapUiTableGroupHeader');
		if ($Parent.length > 0) {
			var iRowIndex = this.getFirstVisibleRow() + parseInt($Parent.attr("data-sap-ui-rowindex"), 10);
			var oBinding = this.getBinding("rows");
			if (oBinding && oBinding.isExpanded(iRowIndex)) {
				oBinding.collapse(iRowIndex);
			} else {
				oBinding.expand(iRowIndex);
			}
			oEvent.preventDefault();
			oEvent.stopImmediatePropagation();
		}
	};

	/**
	 * If focus is on group header, close the group header, else do the default behaviour of item navigation
	 * @private
	 */
	Table.prototype._collapseGroupHeader = function(oEvent) {
		var $Parent = jQuery(oEvent.target).closest('.sapUiTableGroupHeader');
		if ($Parent.length > 0) {
			var iRowIndex = this.getFirstVisibleRow() + parseInt($Parent.attr("data-sap-ui-rowindex"), 10);
			var oBinding = this.getBinding("rows");
			if (oBinding && oBinding.isExpanded(iRowIndex)) {
				oBinding.collapse(iRowIndex);
			}
			oEvent.preventDefault();
			oEvent.stopImmediatePropagation();
		}
	};

	/**
	 * If focus is on group header, open the group header, else do the default behaviour of item navigation
	 * @private
	 */
	Table.prototype._expandGroupHeader = function(oEvent) {
		var $Parent = jQuery(oEvent.target).closest('.sapUiTableGroupHeader');
		if ($Parent.length > 0) {
			var iRowIndex = this.getFirstVisibleRow() + parseInt($Parent.attr("data-sap-ui-rowindex"), 10);
			var oBinding = this.getBinding("rows");
			if (oBinding && !oBinding.isExpanded(iRowIndex)) {
				oBinding.expand(iRowIndex);
			}
			oEvent.preventDefault();
			oEvent.stopImmediatePropagation();
		}
	};

	/**
	 * On shift+left on column header decrease the width of a column
	 * @private
	 */
	Table.prototype.onsapleftmodifiers = function(oEvent) {
		var $Target = jQuery(oEvent.target);
		if ($Target.hasClass('sapUiTableCol')) {
			var iColIndex = parseInt($Target.attr('data-sap-ui-colindex'), 10),
				aVisibleColumns = this._getVisibleColumns(),
				oColumn = aVisibleColumns[this._aVisibleColumns.indexOf(iColIndex)];

			 if (oEvent.shiftKey) {
				 var iNewWidth = parseInt(oColumn.getWidth(), 10) - 16;
				oColumn.setWidth((iNewWidth > 20 ? iNewWidth : 20) + "px");
				oEvent.preventDefault();
				oEvent.stopImmediatePropagation();
			} else if (oEvent.ctrlKey || oEvent.metaKey) {
				if (iColIndex - 1 >= 0) {
					// check whether preceding column is part of column span
					var iNewIndex = 0;

					for (var iPointer = this._aVisibleColumns.indexOf(iColIndex) - 1; iPointer >= 0; iPointer--) {
						iNewIndex = this._aVisibleColumns[iPointer];
						if (aVisibleColumns[iPointer].$().css("display") !== "none") {
							break;
						}
					}
					this.removeColumn(oColumn);
					this.insertColumn(oColumn, iNewIndex);

					// also move spanned columns
					var iHeaderSpan = oColumn.getHeaderSpan();
					if (iHeaderSpan > 1) {
						for (var i = 1; i < iHeaderSpan; i++) {
							oColumn = aVisibleColumns[iColIndex + i];
							this.removeColumn(oColumn);
							this.insertColumn(oColumn, iNewIndex + i);
						}
					}
				}
				oEvent.preventDefault();
				oEvent.stopImmediatePropagation();
			}
		}
	};

	/**
	 * On shift+left on column header decrease the width of a column
	 * @private
	 */
	Table.prototype.onsaprightmodifiers = function(oEvent) {
		var $Target = jQuery(oEvent.target);
		if ($Target.hasClass('sapUiTableCol')) {
			var iColIndex = parseInt($Target.attr('data-sap-ui-colindex'), 10);
			var aVisibleColumns = this._getVisibleColumns();
			var iPointer = this._aVisibleColumns.indexOf(iColIndex);
			var oColumn = aVisibleColumns[iPointer];
			 if (oEvent.shiftKey) {
				oColumn.setWidth(parseInt(oColumn.getWidth(), 10) + 16 + "px");
				oEvent.preventDefault();
				oEvent.stopImmediatePropagation();
			} else if (oEvent.ctrlKey || oEvent.metaKey) {
				var iHeaderSpan = oColumn.getHeaderSpan();
				if (iPointer < aVisibleColumns.length - iHeaderSpan) {
					// Depending on the header span of the column to be moved, several
					// columns might need to be moved to the right
					var iNextHeaderSpan = aVisibleColumns[iPointer + 1].getHeaderSpan(),
						iNewIndex = this._aVisibleColumns[iPointer + iNextHeaderSpan];
					//iPointer = this._aVisibleColumns[iPointer];
					for (var i = iHeaderSpan - 1; i >= 0; i--) {
						oColumn = aVisibleColumns[iPointer + i];
						this.removeColumn(oColumn);
						this.insertColumn(oColumn, iNewIndex + i);
					}
				}
				oEvent.preventDefault();
				oEvent.stopImmediatePropagation();
			}
		}
	};

	// =============================================================================
	// GROUPING
	// =============================================================================

	/*
	 * overridden to hide the group by column when set
	 */
	Table.prototype.setGroupBy = function(vValue) {
		// determine the group by column
		var oGroupBy = vValue;
		if (typeof oGroupBy === "string") {
			oGroupBy = sap.ui.getCore().byId(oGroupBy);
		}

		// only for columns we do the full handling here - otherwise the method
		// setAssociation will fail below with a specific fwk error message
		var bReset = false;
		if (oGroupBy && oGroupBy instanceof sap.ui.table.Column) {

			// check for column being part of the columns aggregation
			if (jQuery.inArray(oGroupBy, this.getColumns()) === -1) {
				throw new Error("Column has to be part of the columns aggregation!");
			}

			// fire the event (to allow to cancel the event)
			var bExecuteDefault = this.fireGroup({column: oGroupBy, groupedColumns: [oGroupBy.getId()], type: sap.ui.table.GroupEventType.group});

			// first we reset the grouping indicator of the old column (will show the column)
			var oOldGroupBy = sap.ui.getCore().byId(this.getGroupBy());
			if (oOldGroupBy) {
				oOldGroupBy.setGrouped(false);
				bReset = true;
			}

			// then we set the grouping indicator of the new column (will hide the column)
			// ==> only if the default behavior is not prevented
			if (bExecuteDefault && oGroupBy instanceof sap.ui.table.Column) {
				oGroupBy.setGrouped(true);
			}

		}

		// reset the binding when no value is given or the binding needs to be reseted
		// TODO: think about a better handling to recreate the group binding
		if (!oGroupBy || bReset) {
			var oBindingInfo = this.getBindingInfo("rows");
			delete oBindingInfo.binding;
			this._bindAggregation("rows", oBindingInfo);
		}

		// set the new group by column (TODO: undefined doesn't work!)
		return this.setAssociation("groupBy", oGroupBy);
	};

	/*
	 * override the getBinding to inject the grouping information into the JSON model.
	 *
	 * !!EXPERIMENTAL FEATURE!!
	 *
	 * TODO:
	 *   - Grouping is not really possible for models based on OData:
	 *     - it works when loading data from the beginning because in this case the
	 *       model has the relevant information (distinct values) to determine the
	 *       count of rows and add them properly in the scrollbar as well as adding
	 *       the group information to the contexts array which is used by the
	 *       _modifyRow to display the group headers
	 *     - it doesn't work when not knowing how many groups are available before
	 *       and on which position the group header has to be added - e.g. when
	 *       displaying a snapshot in the middle of the model.
	 *   - For OData it might be a server-side feature?
	 */
	Table.prototype.getBinding = function(sName) {

		// default binding is the "rows" binding
		sName = sName || "rows";
		var oBinding = sap.ui.core.Element.prototype.getBinding.call(this, sName);

		// we do all the extended stuff only when grouping is enabled
		if (this.getEnableGrouping()) {

			// require the binding types (think about loading them only if required)
			jQuery.sap.require("sap.ui.model.ClientListBinding");

			// check for grouping being supported or not (only for client ListBindings!!)
			var oGroupBy = sap.ui.getCore().byId(this.getGroupBy());
			var bIsSupported = oGroupBy && oGroupBy.getGrouped() &&
			                   sName === "rows" && oBinding &&
			                   oBinding instanceof sap.ui.model.ClientListBinding;

			// only enhance the binding if it has not been done yet and supported!
			if (bIsSupported && !oBinding._modified) {

				// once the binding is modified we always return the modified binding
				// and don't wanna modifiy the binding once again
				oBinding._modified = true;

				// hook into the row modification and add the grouping specifics
				this._modifyRow = function(iRowIndex, $row) {

					// we add the style override to display the row header
					this.$().find(".sapUiTableRowHdrScr").css("display", "block");

					// modify the rows
					var $rowHdr = this.$().find("div[data-sap-ui-rowindex='" + $row.attr("data-sap-ui-rowindex") + "']");
					if (oBinding.isGroupHeader(iRowIndex)) {
						$row.addClass("sapUiTableGroupHeader sapUiTableRowHidden");
						var sClass = oBinding.isExpanded(iRowIndex) ? "sapUiTableGroupIconOpen" : "sapUiTableGroupIconClosed";
						$rowHdr.html("<div class=\"sapUiTableGroupIcon " + sClass + "\" tabindex=\"-1\">" + oBinding.getTitle(iRowIndex) + "</div>");
						$rowHdr.addClass("sapUiTableGroupHeader").removeAttr("title");
					} else {
						$row.removeClass("sapUiTableGroupHeader");
						$rowHdr.html("");
						$rowHdr.removeClass("sapUiTableGroupHeader");
					}

				};

				this.onclick = function(oEvent) {
					if (jQuery(oEvent.target).hasClass("sapUiTableGroupIcon")) {
						var $parent = jQuery(oEvent.target).parents("[data-sap-ui-rowindex]");
						if ($parent.length > 0) {
							var iRowIndex = this.getFirstVisibleRow() + parseInt($parent.attr("data-sap-ui-rowindex"), 10);
							var oBinding = this.getBinding("rows");
							if (oBinding.isExpanded(iRowIndex)) {
								oBinding.collapse(iRowIndex);
								jQuery(oEvent.target).removeClass("sapUiTableGroupIconOpen").addClass("sapUiTableGroupIconClosed");
							} else {
								oBinding.expand(iRowIndex);
								jQuery(oEvent.target).removeClass("sapUiTableGroupIconClosed").addClass("sapUiTableGroupIconOpen");
							}
						}
					} else {
						if (Table.prototype.onclick) {
							Table.prototype.onclick.apply(this, arguments);
						}
					}
				};

				// we use sorting finally to sort the values and afterwards group them
				var sPropertyName = oGroupBy.getSortProperty();
				oBinding.sort(new sap.ui.model.Sorter(sPropertyName));

				// fetch the contexts from the original binding
				var iLength = oBinding.getLength(),
					aContexts = oBinding.getContexts(0, iLength);

				// add the context information for the group headers which are later on
				// used for displaying the grouping information of each group
				var sKey;
				var iCounter = 0;
				for (var i = iLength - 1; i >= 0; i--) {
					var sNewKey = aContexts[i].getProperty(sPropertyName);
					if (!sKey) {
						sKey = sNewKey;
					}
					if (sKey !== sNewKey) {
						var oGroupContext = aContexts[i + 1].getModel().getContext("/sap.ui.table.GroupInfo" + i);
						oGroupContext.__groupInfo = {
							oContext: aContexts[i + 1],
							name: sKey,
							count: iCounter,
							groupHeader: true,
							expanded: true
						};
						aContexts.splice(i + 1, 0,
							oGroupContext
						);
						sKey = sNewKey;
						iCounter = 0;
					}
					iCounter++;
				}
				var oGroupContext = aContexts[0].getModel().getContext("/sap.ui.table.GroupInfo");
				oGroupContext.__groupInfo =	{
					oContext: aContexts[0],
					name: sKey,
					count: iCounter,
					groupHeader: true,
					expanded: true
				};
				aContexts.splice(0, 0,
					oGroupContext
				);

				// extend the binding and hook into the relevant functions to provide
				// access to the grouping information for the _modifyRow function
				jQuery.extend(oBinding, {
					getLength: function() {
						return aContexts.length;
					},
					getContexts: function(iStartIndex, iLength) {
						return aContexts.slice(iStartIndex, iStartIndex + iLength);
					},
					isGroupHeader: function(iIndex) {
						var oContext = aContexts[iIndex];
						return oContext && oContext.__groupInfo && oContext.__groupInfo.groupHeader;
					},
					getTitle: function(iIndex) {
						var oContext = aContexts[iIndex];
						return oContext && oContext.__groupInfo && oContext.__groupInfo.name + " - " + oContext.__groupInfo.count;
					},
					isExpanded: function(iIndex) {
						var oContext = aContexts[iIndex];
						return this.isGroupHeader(iIndex) && oContext.__groupInfo && oContext.__groupInfo.expanded;
					},
					expand: function(iIndex) {
						if (this.isGroupHeader(iIndex) && !aContexts[iIndex].__groupInfo.expanded) {
							for (var i = 0; i < aContexts[iIndex].__childs.length; i++) {
								aContexts.splice(iIndex + 1 + i, 0, aContexts[iIndex].__childs[i]);
							}
							delete aContexts[iIndex].__childs;
							aContexts[iIndex].__groupInfo.expanded = true;
							this._fireChange();
						}
					},
					collapse: function(iIndex) {
						if (this.isGroupHeader(iIndex) && aContexts[iIndex].__groupInfo.expanded) {
							aContexts[iIndex].__childs = aContexts.splice(iIndex + 1, aContexts[iIndex].__groupInfo.count);
							aContexts[iIndex].__groupInfo.expanded = false;
							this._fireChange();
						}
					}

				});

				// the table need to fetch the updated/changed contexts again, therefore requires the binding to fire a change event
				this._mTimeouts.groupingFireBindingChange = this._mTimeouts.groupingFireBindingChange || window.setTimeout(function() {oBinding._fireChange();}, 0);
			}

		}

		return oBinding;

	};

	/**
	 * @private
	 */
	Table.prototype.resetGrouping = function() {
		// reset the group binding only when enhanced
		var oBinding = this.getBinding("rows");
		if (oBinding && oBinding._modified) {

			// we remove the style override to display the row header
			this.$().find(".sapUiTableRowHdrScr").css("display", "");

			// if the grouping is not supported we remove the hacks we did
			// and simply return the binding finally
			this.onclick = Table.prototype.onclick;
			this._modifyRow = undefined;

			// reset the binding
			var oBindingInfo = this.getBindingInfo("rows");
			this.unbindRows();
			this.bindRows(oBindingInfo);
		}
	};

	/**
	 * @private
	 */
	Table.prototype.setEnableGrouping = function(bEnableGrouping) {
		// set the property
		this.setProperty("enableGrouping", bEnableGrouping);
		// reset the grouping
		if (!bEnableGrouping) {
			this.resetGrouping();
		}
		// update the column headers
		this._invalidateColumnMenus();
		return this;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.setEnableCustomFilter = function(bEnableCustomFilter) {
		this.setProperty("enableCustomFilter", bEnableCustomFilter);
		// update the column headers
		this._invalidateColumnMenus();
		return this;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.setEnableColumnFreeze = function(bEnableColumnFreeze) {
		this.setProperty("enableColumnFreeze", bEnableColumnFreeze);
		this._invalidateColumnMenus();
		return this;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.setShowColumnVisibilityMenu = function(bShowColumnVisibilityMenu) {
		this.setProperty("showColumnVisibilityMenu", bShowColumnVisibilityMenu);
		this._invalidateColumnMenus();
		return this;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.setFixedColumnCount = function(iFixedColumnCount) {
		var aCols = this._getVisibleColumns();
		var vHeaderSpan = aCols[iFixedColumnCount - 1] && aCols[iFixedColumnCount - 1].getHeaderSpan();
		if (vHeaderSpan) {
			var iHeaderSpan;
			if (jQuery.isArray(vHeaderSpan)) {
				iHeaderSpan = parseInt(vHeaderSpan[0], 10);
			} else {
				iHeaderSpan = parseInt(vHeaderSpan, 10);
			}
			iFixedColumnCount += iHeaderSpan - 1;
		}
		//Set current width as fixed width for cols
		var $ths = this.$().find(".sapUiTableCtrlFirstCol > th");
		for (var i = 0; i < iFixedColumnCount; i++) {
			var oColumn = aCols[i];
			if (oColumn) {
				var iColumnIndex = jQuery.inArray(oColumn, this.getColumns());
				if (!oColumn.getWidth()) {
					oColumn.setWidth($ths.filter("[data-sap-ui-headcolindex='" + iColumnIndex + "']").width() + "px");
				}
			}
		}
		this.setProperty("fixedColumnCount", iFixedColumnCount);
		this._invalidateColumnMenus();
		return this;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.setFixedRowCount = function(iFixedRowCount) {
		if (!(parseInt(iFixedRowCount, 10) >= 0)) {
			jQuery.sap.log.error("Number of fixed rows must be greater or equal 0", this);
			return this;
		}

		if ((iFixedRowCount + this.getFixedBottomRowCount()) < this.getVisibleRowCount()) {
			this.setProperty("fixedRowCount", iFixedRowCount);
		} else {
			jQuery.sap.log.error("Table '" + this.getId() + "' fixed rows('" + (iFixedRowCount + this.getFixedBottomRowCount()) + "') must be smaller than numberOfVisibleRows('" + this.getVisibleRowCount() + "')", this);
		}
		return this;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.setFixedBottomRowCount = function(iFixedRowCount) {
		if (!(parseInt(iFixedRowCount, 10) >= 0)) {
			jQuery.sap.log.error("Number of fixed bottom rows must be greater or equal 0", this);
			return this;
		}

		if ((iFixedRowCount + this.getFixedRowCount()) < this.getVisibleRowCount()) {
			this.setProperty("fixedBottomRowCount", iFixedRowCount);
		} else {
			jQuery.sap.log.error("Table '" + this.getId() + "' fixed rows('" + (iFixedRowCount + this.getFixedRowCount()) + "') must be smaller than numberOfVisibleRows('" + this.getVisibleRowCount() + "')", this);
		}
		return this;
	};

	/**
	 * Sets the threshold value, which will be added to all data requests in
	 * case the Table is bound against an OData service.
	 * @public
	 */
	Table.prototype.setThreshold = function (iThreshold) {
		this.setProperty("threshold", iThreshold, true);
	};

	/**
	 *
	 * @private
	 */
	Table.prototype._invalidateColumnMenus = function() {
		var aCols = this.getColumns();
		for (var i = 0, l = aCols.length; i < l; i++) {
			aCols[i].invalidateMenu();
		}
	};

	/**
	 * Checks whether the passed oEvent is a touch event.
	 * @private
	 * @param {event} oEvent The event to check
	 * @return {boolean} false
	 */
	Table.prototype._isTouchMode = function(oEvent) {
		return !!oEvent.originalEvent["touches"];
	};

	/**
	 * The selectstart event triggered in IE to select the text.
	 * @private
	 * @param {event} oEvent The splitterselectstart event
	 * @return {boolean} false
	 */
	Table.prototype._splitterSelectStart = function(oEvent){
		oEvent.preventDefault();
		oEvent.stopPropagation();
		return false;
	};

	/**
	 * Drops the previous dragged horizontal splitter bar and recalculates the amount of rows to be displayed.
	 * @private
	 */
	Table.prototype._onGhostMouseRelease = function(oEvent) {
		var $this = this.$();
		var $splitterBarGhost = jQuery(this.getDomRef("ghost"));
		var iLocationY = this._isTouchMode(oEvent) ? oEvent.changedTouches[0].pageY : oEvent.pageY;

		var iNewHeight = iLocationY - $this.find(".sapUiTableCCnt").offset().top - $splitterBarGhost.height() - $this.find(".sapUiTableFtr").height();
		this._setRowContentHeight(iNewHeight);
		this._adjustRows(this._calculateRowsToDisplay(iNewHeight));

		$splitterBarGhost.remove();
		this.$("overlay").remove();

		jQuery(document.body).unbind("selectstart", this._splitterSelectStart);

		var $document = jQuery(document);
		$document.unbind("touchend.sapUiTableInteractiveResize");
		$document.unbind("touchmove.sapUiTableInteractiveResize");
		$document.unbind("mouseup.sapUiTableInteractiveResize");
		$document.unbind("mousemove.sapUiTableInteractiveResize");

		this._enableTextSelection();
	};

	/**
	 * Drags the horizontal splitter bar for visibleRowCountMode "Interactive".
	 * @param oEvent
	 * @private
	 */
	Table.prototype._onGhostMouseMove = function(oEvent) {
		var splitterBarGhost = this.getDomRef("ghost");

		var iLocationY = this._isTouchMode(oEvent) ? oEvent.targetTouches[0].pageY : oEvent.pageY;
		var min = this.$().offset().top;
		if (iLocationY > min) {
			jQuery(splitterBarGhost).css("top", iLocationY + "px");
		}
	};

	Table.prototype._determineParent = function() {
		var oParent = this.getParent();

		if (oParent) {
			var oParentDomRef;
			if (oParent.getDomRef) {
				// for Controls
				oParentDomRef = oParent.getDomRef();
			} else if (oParent.getRootNode) {
				// for UIArea
				oParentDomRef = oParent.getRootNode();
			}

			if (oParentDomRef) {
				return jQuery(oParentDomRef);
			}
		}
		return jQuery();
	};

	Table.prototype._getRowTemplate = function() {
		if (!this._oRowTemplate) {
			// create the new template
			this._oRowTemplate = new Row(this.getId() + "-rows");
			var aColumns = this.getColumns();
			for (var i = 0, l = aColumns.length; i < l; i++) {
				if (aColumns[i].getVisible()) {
					var oColumnTemplate = aColumns[i].getTemplate();
					if (oColumnTemplate) {
						var oColumnTemplateClone = oColumnTemplate.clone("col" + i);
						oColumnTemplateClone.data("sap-ui-colindex", i);
						oColumnTemplateClone.data("sap-ui-colid", aColumns[i].getId());
						this._oRowTemplate.addCell(oColumnTemplateClone);
					}
				}
			}
		}

		return this._oRowTemplate;
	};

	Table.prototype._getDummyRow = function() {
		if (!this._oDummyRow) {
			this._oDummyRow = this._getRowTemplate().clone("dummy");
			this._oDummyRow._bDummyRow = true;
			this._oDummyRow._bHidden = true;
		}

		return this._oDummyRow;
	};

	Table.prototype._resetRowTemplate = function() {
		if (this._oRowTemplate) {
			this._oRowTemplate.destroy();
			this._oRowTemplate = undefined;
		}
		if (this._oDummyRow) {
			this._oDummyRow.destroy();
			this._oDummyRow = undefined;
		}
	};

	/**
	 * creates the rows for the rows aggregation
	 * @private
	 */
	Table.prototype._adjustRows = function(iNumberOfRows, bNoUpdate) {
		if (isNaN(iNumberOfRows)) {
			return false;
		}

		var i;
		var aRows = this.getRows();
		if (!this._oRowTemplate && aRows.length > 0) {
			this.destroyAggregation("rows", true);
			aRows = [];
		}

		if (iNumberOfRows == aRows.length) {
			return false;
		}

		// remove rows from aggregation if they are not needed anymore required
		for (i = aRows.length - 1; i >= iNumberOfRows; i--) {
			this.removeAggregation("rows", i, true).destroy();
		}

		this.setProperty("visibleRowCount", iNumberOfRows, true);

		// this call might cause the cell (controls) to invalidate theirself and therefore also the table. It should be
		// avoided to rerender the complete table since rendering of the rows is handled here. All child controls get
		// rendered.
		this._ignoreInvalidateOfChildControls = true;
		var aContexts;
		var iFirstVisibleRow = this.getFirstVisibleRow();
		var iAbsoluteRowIndex = 0;
		var bExecuteCallback = false;
		var oBindingInfo;
		var oBinding = this.getBinding("rows");

		if (!bNoUpdate) {
			// set binding contexts for known rows
			oBindingInfo = this.getBindingInfo("rows");
			bExecuteCallback = typeof this._updateTableCell === "function";
			aContexts = this._getRowContexts(iNumberOfRows);

			for (i = 0; i < aRows.length; i++) {
				iAbsoluteRowIndex = iFirstVisibleRow + i;
				this._updateRowBindingContext(aRows[i], aContexts[i], oBindingInfo && oBindingInfo.model, iAbsoluteRowIndex, bExecuteCallback, oBinding);
			}
		}

		if (aRows.length < iNumberOfRows) {
			// clone rows and set binding context for them
			var oRowTemplate = this._getRowTemplate();

			for (i = aRows.length; i < iNumberOfRows; i++) {
				// add new rows and set their binding contexts in the same run in order to avoid unnecessary context
				// propagations.
				var oClone = oRowTemplate.clone("row" + i);
				if (!bNoUpdate) {
					iAbsoluteRowIndex = iFirstVisibleRow + i;
					this._updateRowBindingContext(oClone, aContexts[i], oBindingInfo && oBindingInfo.model, iAbsoluteRowIndex, bExecuteCallback, oBinding);
				}
				this.addAggregation("rows", oClone, true);
			}
		}
		this._ignoreInvalidateOfChildControls = false;

		aRows = this.getRows();
		bNoUpdate = bNoUpdate || aContexts.length == 0;
		return this._insertTableRows(aRows, bNoUpdate);
	};

	/**
	 * Insert table rows into DOM.
	 *
	 * @param {sap.ui.table.Row[]} [aRows] Rows aggregation to be rendered.
	 * @param {Number} [iMaxRowCount] Maximum amount of row to be rendered.
	 * @private
	 */
	Table.prototype._insertTableRows = function(aRows, bNoUpdate) {
		var bReturn = false;
		if (!this._bInvalid) {
			this._detachEvents();

			var oTBody = this.getDomRef("tableCCnt");
			aRows = aRows || this.getRows();
			if (!aRows.length || !oTBody) {
				return;
			}

			if (this.getVisibleRowCountMode() == sap.ui.table.VisibleRowCountMode.Auto) {
				this.getDomRef().style.height = "0px";
			}

			var oRM = new sap.ui.getCore().createRenderManager(),
				oRenderer = this.getRenderer();

			this._iDefaultRowHeight = undefined;
			oRenderer.renderTableCCnt(oRM, this);
			oRM.flush(oTBody, false, false);
			oRM.destroy();

			// since the row is an element it has no own renderer. Anyway, logically it has a domref. Let the rows
			// update their domrefs after the rendering is done. This is required to allow performant access to row domrefs
			this._initRowDomRefs();

			// restore the column icons
			var aCols = this.getColumns();
			for (var i = 0, l = aCols.length; i < l; i++) {
				if (aCols[i].getVisible()) {
					aCols[i]._restoreIcons();
				}
			}

			this._updateTableSizes();

			this._updateGroupHeader();

			bReturn = true;
			// for TreeTable and AnalyticalTable
			if (this._updateTableContent) {
				this._updateTableContent();
			}
			this._attachEvents();
		}

		if (!bNoUpdate && !this._bInvalid && this.getBinding("rows")) {
			var that = this;
			if (this._mTimeouts._rowsUpdated) {
				window.clearTimeout(this._mTimeouts._rowsUpdated);
			}
			this._mTimeouts._rowsUpdated = window.setTimeout(function() {
				that.fireEvent("_rowsUpdated");
			}, 0);
		}

		return bReturn;
	};

	/**
	 * Determines the default row height, based upon the height of the row template.
	 * @private
	 */
	Table.prototype._getDefaultRowHeight = function(aRowHeights) {
		if (!this._iDefaultRowHeight && this.getDomRef()) {
			aRowHeights = aRowHeights || this._collectRowHeights();
			if (aRowHeights && aRowHeights.length > 0) {
				this._iDefaultRowHeight = aRowHeights[0];
			}
		}

		if (!this._iDefaultRowHeight) {
			this._iDefaultRowHeight = 28;
		}

		return this._iDefaultRowHeight;
	};

	/**
	 * Determines and sets the height of tableCtrlCnt based upon the VisibleRowCountMode and other conditions.
	 * @param iHeight
	 * @private
	 */
	Table.prototype._setRowContentHeight = function(iHeight) {
		iHeight = iHeight || 0;
		var sVisibleRowCountMode = this.getVisibleRowCountMode();
		var iVisibleRowCount = this.getVisibleRowCount();
		var iMinVisibleRowCount = this.getMinAutoRowCount();
		var iMinHeight;

		var iDefaultRowHeight = this._getDefaultRowHeight();
		if (sVisibleRowCountMode == sap.ui.table.VisibleRowCountMode.Interactive || sVisibleRowCountMode == sap.ui.table.VisibleRowCountMode.Fixed) {
			if (this._iTableRowContentHeight && sVisibleRowCountMode == sap.ui.table.VisibleRowCountMode.Interactive) {
				iMinHeight = iMinVisibleRowCount * iDefaultRowHeight;
				if (!iHeight) {
					iHeight = this._iTableRowContentHeight;
				}
			} else {
				// Fixed or Interactive without RowContentHeight (Height was not yet adjusted by user)
				iMinHeight = iVisibleRowCount * iDefaultRowHeight;
				iHeight = iMinHeight;
			}
		} else if (sVisibleRowCountMode == sap.ui.table.VisibleRowCountMode.Auto) {
			iMinHeight = iMinVisibleRowCount * iDefaultRowHeight;
		}

		var iRowContentHeight = Math.max(iHeight, iMinHeight);
		this._iTableRowContentHeight = Math.floor(iRowContentHeight / iDefaultRowHeight) * iDefaultRowHeight;

		if ((sVisibleRowCountMode == sap.ui.table.VisibleRowCountMode.Fixed || sVisibleRowCountMode == sap.ui.table.VisibleRowCountMode.Interactive) && this.getRows().length > 0) {
			jQuery(this.getDomRef("tableCtrlCnt")).css("height", "auto");
		} else {
			jQuery(this.getDomRef("tableCtrlCnt")).css("height", this._iTableRowContentHeight + "px");
		}
	};

	/**
	 * Determines the minimal row count for rowCountMode "auto".
	 * @private
	 */
	Table.prototype._determineMinAutoRowCount = function() {
		var iVisibleRowCount = this.getVisibleRowCount();
		var iMinAutoRowCount = this.getMinAutoRowCount();
		var iMinRowCount = iMinAutoRowCount || iVisibleRowCount || 5;
		if (this.getVisibleRowCountMode() == sap.ui.table.VisibleRowCountMode.Interactive && !this.bOutput) {
			iMinRowCount = iVisibleRowCount || iMinAutoRowCount || 5;
		}
		return iMinRowCount;
	};

	/**
	 * Calculates the maximum rows to display within the table.
	 * @private
	 */
	Table.prototype._calculateRowsToDisplay = function(iTableRowContentHeight) {
		iTableRowContentHeight = iTableRowContentHeight || this._iTableRowContentHeight;
		var sVisibleRowCountMode = this.getVisibleRowCountMode();
		var iCalculatedRowsToDisplay = 0;
		if (sVisibleRowCountMode == sap.ui.table.VisibleRowCountMode.Fixed) {
			// at least one row must be rendered in a table
			iCalculatedRowsToDisplay = this.getVisibleRowCount() || 0;
		} else if (sVisibleRowCountMode == sap.ui.table.VisibleRowCountMode.Interactive || sVisibleRowCountMode == sap.ui.table.VisibleRowCountMode.Auto) {
			var iMinAutoRowCount = this._determineMinAutoRowCount();
			var iDefaultRowHeight = this._getDefaultRowHeight();
			if (!iDefaultRowHeight || !iTableRowContentHeight) {
				iCalculatedRowsToDisplay = iMinAutoRowCount;
			} else {
				// Make sure that table does not grow to infinity
				// Maximum height of the table is the height of the window minus two row height, reserved for header and footer.
				var iAvailableSpace = Math.min(iTableRowContentHeight, 50000);
				// the last content row height is iRowHeight - 1, therefore + 1 in the formula below:
				// to avoid issues with having more fixed rows than visible row count, the number of visible rows must be
				// adjusted.
				var iRowCount = Math.floor(iAvailableSpace / iDefaultRowHeight);
				iCalculatedRowsToDisplay = Math.max((this.getFixedRowCount() + this.getFixedBottomRowCount() + 1), Math.max(iMinAutoRowCount, iRowCount));
			}
		}

		return Math.max(iCalculatedRowsToDisplay, 0);
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.setShowNoData = function(bShowNoData) {
		this.setProperty('showNoData', bShowNoData, true);
		bShowNoData = this.getProperty('showNoData');
		if (!bShowNoData) {
			this.$().removeClass("sapUiTableEmpty");
		} else {
			this._updateNoData();
		}
		return this;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.setNoDataText = function(sText) {
		this.setProperty("noDataText", sText, true);
		this.$().find('.sapUiTableCtrlEmptyMsg').text(sText);
	};

	/**
	 * Creates a new {@link sap.ui.core.util.Export} object and fills row/column information from the table if not provided. For the cell content, the column's "sortProperty" will be used (experimental!)
	 *
	 * <p><b>Please note: The return value was changed from jQuery Promises to standard ES6 Promises.
	 * jQuery specific Promise methods ('done', 'fail', 'always', 'pipe' and 'state') are still available but should not be used.
	 * Please use only the standard methods 'then' and 'catch'!</b></p>
	 *
	 * @param {object} [mSettings] settings for the new Export, see {@link sap.ui.core.util.Export} <code>constructor</code>
	 * @return {Promise} Promise object
	 *
	 * @experimental Experimental because the property for the column/cell definitions (sortProperty) could change in future.
	 * @public
	 */
	Table.prototype.exportData = function(mSettings) {
		jQuery.sap.require("sap.ui.core.util.Export");

		mSettings = mSettings || {};

		if (!mSettings.rows) {
			var oBinding = this.getBinding("rows"),
				oBindingInfo = this.getBindingInfo("rows");

			var aFilters = oBinding.aFilters.concat(oBinding.aApplicationFilters);

			mSettings.rows = {
				path: oBindingInfo.path,
				model: oBindingInfo.model,
				sorter: oBinding.aSorters,
				filters: aFilters,
				parameters: oBindingInfo.parameters
			};
		}

		// by default we choose the export type CSV
		if (!mSettings.exportType) {
			jQuery.sap.require("sap.ui.core.util.ExportTypeCSV");
			mSettings.exportType = new sap.ui.core.util.ExportTypeCSV();
		}

		var sModelName = mSettings.rows.model;
		if (!sModelName) {
			// if a model separator is found in the path, extract model name from there
			var sPath = mSettings.rows.path;
			var iSeparatorPos = sPath.indexOf(">");
			if (iSeparatorPos > 0) {
				sModelName = sPath.substr(0, iSeparatorPos);
			}
		}

		if (!mSettings.columns) {
			mSettings.columns = [];

			var aColumns = this.getColumns();
			for (var i = 0, l = aColumns.length; i < l; i++) {
				var oColumn = aColumns[i];
				if (oColumn.getSortProperty()) {
					mSettings.columns.push({
						name: oColumn.getLabel().getText(),
						template: {
							content: {
								path: oColumn.getSortProperty(),
								model: sModelName
							}
						}
					});
				}
			}
		}

		var oExport = new sap.ui.core.util.Export(mSettings);
		this.addDependent(oExport);

		return oExport;
	};

	/**
	 * internal function to calculate the widest content width of the column
	 * also takes the column header and potential icons into account
	 * @param {int} iColIndex index of the column which should be resized
	 * @return {int} minWidth minimum width the column needs to have
	 * @private
	 * @experimental Experimental, only works with a limited control set
	 * @function
	 */

	Table.prototype._calculateAutomaticColumnWidth = function(iColIndex) {

		var aTextBasedControls = [
			"sap.m.Text",
			"sap.m.Label",
			"sap.m.Link",
			"sap.ui.commons.TextView",
			"sap.ui.commons.Label",
			"sap.ui.commons.Link"
		];

		var $this = this.$();
		var iHeaderWidth = 0;

		var $cols = $this.find('td[headers=\"' + this.getId() + '_col' + iColIndex + '\"]').children("div");
		var oColumns = this.getColumns();
		var oCol = oColumns[iColIndex];
		if (!oCol) {
			return null;
		}
		var aHeaderSpan = oCol.getHeaderSpan();
		var oColLabel = oCol.getLabel();
		var that = this;

		var oColTemplate = oCol.getTemplate();
		var bIsTextBased = jQuery.inArray(oColTemplate.getMetadata().getName(), aTextBasedControls) != -1 ||
		                   sap.ui.commons && sap.ui.commons.TextField && oColTemplate instanceof sap.ui.commons.TextField ||
		                   sap.m && sap.m.Input && oColTemplate instanceof sap.m.Input;

		var hiddenSizeDetector = document.createElement("div");
		document.body.appendChild(hiddenSizeDetector);
		jQuery(hiddenSizeDetector).addClass("sapUiTableHiddenSizeDetector");

		var oColLabels = oCol.getMultiLabels();
		if (oColLabels.length == 0 && !!oColLabel){
			oColLabels = [oColLabel];
		}

		if (oColLabels.length > 0) {
			jQuery.each(oColLabels, function(iIdx, oLabel){
				var iHeaderSpan;
				if (!!oLabel.getText()){
					jQuery(hiddenSizeDetector).text(oLabel.getText());
					iHeaderWidth = hiddenSizeDetector.scrollWidth;
				} else {
					iHeaderWidth = oLabel.$().scrollWidth;
				}
				iHeaderWidth = iHeaderWidth + $this.find("#" + oCol.getId() + "-icons").first().width();

				$this.find(".sapUiTableColIcons#" + oCol.getId() + "_" + iIdx + "-icons").first().width();
				if (aHeaderSpan instanceof Array && aHeaderSpan[iIdx] > 1){
					iHeaderSpan = aHeaderSpan[iIdx];
				} else if (aHeaderSpan > 1){
					iHeaderSpan = aHeaderSpan;
				}
				if (!!iHeaderSpan){
					// we have a header span, so we need to distribute the width of this header label over more than one column
					//get the width of the other columns and subtract from the minwidth required from label side
					var i = iHeaderSpan - 1;
					while (i > iColIndex) {
						iHeaderWidth = iHeaderWidth - (that._oCalcColumnWidths[iColIndex + i] || 0);
						i -= 1;
					}
				}
			});
		}

		var minAddWidth = Math.max.apply(null, $cols.map(
			function(){
				var _$this = jQuery(this);
				return parseInt(_$this.css('padding-left'), 10) + parseInt(_$this.css('padding-right'), 10)
						+ parseInt(_$this.css('margin-left'), 10) + parseInt(_$this.css('margin-right'), 10);
			}).get());

		//get the max width of the currently displayed cells in this column
		var minWidth = Math.max.apply(null, $cols.children().map(
			function() {
				var width = 0,
				sWidth = 0;
				var _$this = jQuery(this);
				var sColText = _$this.text() || _$this.val();

				if (bIsTextBased){
					jQuery(hiddenSizeDetector).text(sColText);
					sWidth = hiddenSizeDetector.scrollWidth;
				} else {
					sWidth = this.scrollWidth;
				}
				if (iHeaderWidth > sWidth){
					sWidth = iHeaderWidth;
				}
				width = sWidth + parseInt(_$this.css('margin-left'), 10)
										+ parseInt(_$this.css('margin-right'), 10)
										+ minAddWidth
										+ 1; // ellipsis is still displayed if there is an equality of the div's width and the table column
				return width;
			}).get());

		jQuery(hiddenSizeDetector).remove();
		return Math.max(minWidth, this._iColMinWidth);
	};

	/**
	 *
	 * @private
	 */
	Table.prototype._onPersoApplied = function() {

		// apply the sorter and filter again (right now only the first sorter is applied)
		var aColumns = this.getColumns();
		var aSorters = [];//, aFilters = [];
		for (var i = 0, l = aColumns.length; i < l; i++) {
			var oColumn = aColumns[i];
			if (oColumn.getSorted()) {
				aSorters.push(new sap.ui.model.Sorter(oColumn.getSortProperty(), oColumn.getSortOrder() === sap.ui.table.SortOrder.Descending));
			/*
			} else if (oColumn.getFiltered()) {
				aFilters.push(oColumn._getFilter());
			*/
			}
		}

		if (aSorters.length > 0 && this.getBinding("rows")) {
			this.getBinding("rows").sort(aSorters);
		}
		/*
		if (aFilters.length > 0 && this.getBinding("rows")) {
			this.getBinding("rows").filter(aFilters);
		}
		*/

		this.refreshRows();

	};

	/**
	 * Toggles the selection state of all cells.
	 * @private
	 */
	Table.prototype._toggleSelectAll = function() {

		if (!this.$("selall").hasClass("sapUiTableSelAll")) {
			this.clearSelection();
		} else {
			this.selectAll();
		}
		if (!!Device.browser.internet_explorer) {
			this.$("selall").focus();
		}
	};

	/**
	 *
	 * @private
	 */
	Table.prototype._restoreAppDefaultsColumnHeaderSortFilter = function () {
		var aColumns = this.getColumns();
		jQuery.each(aColumns, function(iIndex, oColumn){
			oColumn._restoreAppDefaults();
		});
	};

	/**
	 *
	 * @param mParameters
	 * @private
	 */
	Table.prototype._setBusy = function (mParameters) {
		var oBinding,
			i,
			bSetBusy;

		if (!this.getEnableBusyIndicator() || !this._bBusyIndicatorAllowed) {
			return;
		}

		oBinding = this.getBinding("rows");
		if (!oBinding) {
			return;
		}

		this.setBusy(false);
		if (mParameters) {
			var sReason = mParameters.reason;
			if (mParameters.contexts && mParameters.contexts.length !== undefined) {
				// TreeBinding and AnalyticalBinding always return a contexts array with the
				// requested length. Both put undefined in it for contexts which need to be loaded
				// Check for undefined in the contexts array.
				bSetBusy = false;
				for (i = 0; i < mParameters.contexts.length; i++) {
					if (mParameters.contexts[i] === undefined) {
						bSetBusy = true;
						break;
					}
				}
			} else if (mParameters.changeReason === ChangeReason.Expand) {
				this.setBusy(true);
			}

			var iLength = oBinding.getLength();
			if ((sReason == ChangeReason.Expand && this._iDataRequestedCounter !== 0) || bSetBusy || (oBinding.isInitial()) || (mParameters.receivedLength === 0 && this._iDataRequestedCounter !== 0) ||
				(mParameters.receivedLength < mParameters.requestedLength && mParameters.receivedLength !== iLength &&
				 mParameters.receivedLength !== iLength - this.getFirstVisibleRow())) {
				this.setBusy(true);
			}
		}
	};

	Table.prototype.setBusy = function (bBusy, sBusySection) {
		var bBusyChanged = this.getBusy() != bBusy;

		sBusySection = "sapUiTableCnt";
		var vReturn = Control.prototype.setBusy.call(this, bBusy, sBusySection);
		if (bBusyChanged) {
			this.fireBusyStateChanged({busy: bBusy});
		}
		return vReturn;
	};

	/*
	 * Prevents re-rendering, when enabling/disabling busy indicator.
	 * Avoids the request delays.
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.setEnableBusyIndicator = function (bValue) {
		this.setProperty("enableBusyIndicator", bValue, true);
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Table.prototype.setColumnHeaderVisible = function(bColumnHeaderVisible) {
		this.setProperty("columnHeaderVisible", bColumnHeaderVisible);
		// Adapt the item navigation. Since the HeaderRowCount changed, also the lastSelectedDataRow changes.
		this._iLastSelectedDataRow = this._getHeaderRowCount();

	};

	/**
	 *
	 * @private
	 */
	Table.prototype._attachDataRequestedListeners = function () {
		var oBinding = this.getBinding("rows");
		if (oBinding) {
			oBinding.detachDataRequested(this._onBindingDataRequestedListener, this);
			oBinding.detachDataReceived(this._onBindingDataReceivedListener, this);
			this._iDataRequestedCounter = 0;
			oBinding.attachDataRequested(this._onBindingDataRequestedListener, this);
			oBinding.attachDataReceived(this._onBindingDataReceivedListener, this);
		}
	};

	/**
	 *
	 * @private
	 */
	Table.prototype._onBindingDataRequestedListener = function (oEvent) {
		if (oEvent.getSource() == this.getBinding("rows") && !oEvent.getParameter("__simulateAsyncAnalyticalBinding")) {
			this._iDataRequestedCounter++;
		}
	};

	/**
	 *
	 * @private
	 */
	Table.prototype._onBindingDataReceivedListener = function (oEvent) {
		if (oEvent.getSource() == this.getBinding("rows") && !oEvent.getParameter("__simulateAsyncAnalyticalBinding")) {
			this._iDataRequestedCounter--;
		}
	};

	/**
	 *
	 * @private
	 */
	Table.prototype._attachBindingListener = function() {
		this._attachDataRequestedListeners();
	};

	/**
	 * Lets you control in which situation the <code>ScrollBar</code> fires scroll events.
	 *
	 * @param {boolean} bLargeDataScrolling Set to true to let the <code>ScrollBar</code> only fires scroll events when
	 * the scroll handle is released. No matter what the setting is, the <code>ScrollBar</code> keeps on fireing scroll events
	 * when the user scroll with the mousewheel or using touch
	 * @private
	 */
	Table.prototype._setLargeDataScrolling = function(bLargeDataScrolling) {
		this._bLargeDataScrolling = !!bLargeDataScrolling;
	};

	Table.prototype._getFirstColumnAttributes = function(oRow) {
		return {};
	};

	return Table;

}, /* bExport= */ true);

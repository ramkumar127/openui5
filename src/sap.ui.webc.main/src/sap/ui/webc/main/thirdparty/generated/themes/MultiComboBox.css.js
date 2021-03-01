sap.ui.define(['sap/ui/webc/common/thirdparty/base/asset-registries/Themes', 'sap/ui/webc/common/thirdparty/theme-base/generated/themes/sap_fiori_3/parameters-bundle.css', './sap_fiori_3/parameters-bundle.css'], function (Themes, defaultThemeBase, parametersBundle_css) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

	var defaultThemeBase__default = /*#__PURE__*/_interopDefaultLegacy(defaultThemeBase);

	Themes.registerThemePropertiesLoader("@ui5/webcomponents-theme-base", "sap_fiori_3", () => defaultThemeBase__default);
	Themes.registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => parametersBundle_css);
	var styles = ".ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none}:host{width:var(--_ui5_input_width);min-width:var(--_ui5_input_width);height:var(--_ui5_input_height);color:var(--sapField_TextColor);font-size:var(--sapFontSize);font-family:\"72override\",var(--sapFontFamily);font-style:normal;background-color:var(--sapField_Background);border:1px solid var(--sapField_BorderColor);border-radius:var(--_ui5_input_wrapper_border_radius);box-sizing:border-box;line-height:normal;letter-spacing:normal;word-spacing:normal;text-align:start}:host([focused]){outline:var(--_ui5_input_focus_border_width) dotted var(--sapContent_FocusColor);outline-offset:-3px}:host([value-state]:not([value-state=None])[focused]){outline:var(--_ui5_input_focus_border_width) dotted var(--sapContent_FocusColor);outline-offset:-4px}.ui5-input-root{width:100%;height:100%;background:transparent;display:inline-block;outline:none;box-sizing:border-box;color:inherit}:host([disabled]){opacity:var(--_ui5_input_disabled_opacity);cursor:default;pointer-events:none;background:var(--sapField_ReadOnly_Background);border-color:var(--sapField_ReadOnly_BorderColor)}[inner-input]{background:transparent;color:inherit;border:none;font-style:inherit;-webkit-appearance:none;-moz-appearance:textfield;padding:var(--_ui5_input_inner_padding);box-sizing:border-box;min-width:inherit;width:100%;text-overflow:ellipsis;flex:1;outline:none;font-size:inherit;font-family:inherit;line-height:inherit;letter-spacing:inherit;word-spacing:inherit;text-align:inherit}[inner-input][inner-input-with-icon]{padding:var(--_ui5_input_inner_padding_with_icon)}[inner-input]::selection{background:var(--sapSelectedColor);color:var(--sapContent_ContrastTextColor)}:host([disabled]) [inner-input]::-webkit-input-placeholder{visibility:hidden}:host([readonly]) [inner-input]::-webkit-input-placeholder{visibility:hidden}[inner-input]::-webkit-input-placeholder{font-style:italic;color:var(--sapField_PlaceholderTextColor);padding-right:.125rem}:host([disabled]) [inner-input]::-moz-placeholder{visibility:hidden}:host([readonly]) [inner-input]::-moz-placeholder{visibility:hidden}[inner-input]::-moz-placeholder{font-style:italic;color:var(--sapField_PlaceholderTextColor);padding-right:.125rem}:host([disabled]) [inner-input]:-ms-input-placeholder{visibility:hidden}:host([readonly]) [inner-input]:-ms-input-placeholder{visibility:hidden}[inner-input]:-ms-input-placeholder{font-style:italic;color:var(--sapField_PlaceholderTextColor);padding-right:.125rem}.ui5-input-content{height:100%;box-sizing:border-box;display:flex;flex-direction:row;justify-content:flex-end;overflow:hidden;outline:none;background:transparent;color:inherit}:host([readonly]){border-color:var(--sapField_ReadOnly_BorderColor);background:var(--sapField_ReadOnly_Background)}:host(:not([value-state]):not([readonly]):hover){background-color:var(--sapField_Hover_Background);border:1px solid var(--sapField_Hover_BorderColor)}:host([value-state=None]:not([readonly]):hover){background-color:var(--sapField_Hover_Background);border:1px solid var(--sapField_Hover_BorderColor)}:host([value-state]:not([value-state=None])){border-width:var(--_ui5_input_state_border_width)}:host([value-state=Error]) [inner-input],:host([value-state=Warning]) [inner-input]{font-style:var(--_ui5_input_error_warning_font_style)}:host([value-state=Error]) [inner-input]{font-weight:var(--_ui5_input_error_font_weight)}:host([value-state=Error]:not([readonly])){background-color:var(--sapField_InvalidBackground);border-color:var(--sapField_InvalidColor)}:host([value-state=Error]:not([readonly]):not([disabled])),:host([value-state=Information]:not([readonly]):not([disabled])),:host([value-state=Warning]:not([readonly]):not([disabled])){border-style:var(--_ui5_input_error_warning_border_style)}:host([value-state=Warning]:not([readonly])){background-color:var(--sapField_WarningBackground);border-color:var(--sapField_WarningColor)}:host([value-state=Success]:not([readonly])){background-color:var(--sapField_SuccessBackground);border-color:var(--sapField_SuccessColor);border-width:1px}:host([value-state=Information]:not([readonly])){background-color:var(--sapField_InformationBackground);border-color:var(--sapField_InformationColor);border-width:var(--_ui5-input-information_border_width)}[inner-input]::-ms-clear{height:0;width:0}.ui5-input-icon-root{min-width:var(--_ui5_input_icon_min_width);height:100%;display:flex;justify-content:center;align-items:center}::slotted([ui5-icon][slot=icon]){padding:var(--_ui5_input_icon_padding)}[inner-input]::-webkit-inner-spin-button,[inner-input]::-webkit-outer-spin-button{-webkit-appearance:inherit;margin:inherit}[input-icon]{color:var(--sapContent_IconColor);cursor:pointer;outline:none;padding:var(--_ui5_input_icon_padding);border-left:1px solid transparent;min-width:1rem;min-height:1rem}[input-icon][pressed]{background:var(--sapButton_Selected_Background);color:var(--sapButton_Active_TextColor)}[input-icon]:active{background-color:var(--sapButton_Active_Background);color:var(--sapButton_Active_TextColor)}[input-icon]:not([pressed]):not(:active):hover{background:var(--sapButton_Lite_Hover_Background)}[input-icon]:hover{border-left:var(--_ui5_select_hover_icon_left_border)}[input-icon][dir=rtl]:hover{border-left:none;border-right:var(--_ui5_select_hover_icon_left_border)}[input-icon][dir=rtl]{border-left:none;border-right:1px solid transparent}:host(:not([hidden])){display:inline-block;--_ui5_popup_content_padding:0}.ui5-multi-combobox-root{display:flex;overflow:hidden;width:100%;height:100%}.ui5-multi-combobox-tokenizer{max-width:calc(100% - 3rem - var(--_ui5_input_icon_min_width));border:none;width:auto;min-width:0;height:100%}[ui5-multi-combobox]{width:100%}[ui5-multi-combobox] [ui5-tokenizer]{flex:3}";

	return styles;

});

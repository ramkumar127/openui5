sap.ui.define(function () { 'use strict';

	var parametersBundle_css = {packageName:"@ui5/webcomponents-theming",fileName:"themes/sap_horizon_dark/parameters-bundle.css",content:":root{--sapThemeMetaData-Base-baseLib:{\"Path\":\"Base.baseLib.sap_horizon_dark.css_variables\",\"PathPattern\":\"/%frameworkId%/%libId%/%themeId%/%fileId%.css\",\"Extends\":[\"sap_horizon\",\"baseTheme\"],\"Tags\":[\"Fiori_3\",\"DarkColorScheme\"],\"FallbackThemeId\":\"sap_horizon\",\"Engine\":{\"Name\":\"theming-engine\",\"Version\":\"1.68.3\"},\"Version\":{ \"Build\":\"11.1.36.20220314143804\",\"Source\":\"11.1.36\"}};--sapBrandColor:#0070f2;--sapHighlightColor:#4db1ff;--sapBaseColor:#1d232a;--sapShellColor:#1d232a;--sapBackgroundColor:#12171c;--sapFontFamily:\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontLightFamily:\"72-Light\",\"72-Lightfull\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontBoldFamily:\"72-Bold\",\"72-Boldfull\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontSemiboldFamily:\"72-Semibold\",\"72-Semiboldfull\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontSemiboldDuplexFamily:\"72-SemiboldDuplex\",\"72-SemiboldDuplexfull\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontBlackFamily:\"72Black\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontHeaderFamily:\"72-Bold\",\"72-Boldfull\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapFontSize:.875rem;--sapFontSmallSize:.75rem;--sapFontLargeSize:1rem;--sapFontHeader1Size:3rem;--sapFontHeader2Size:2rem;--sapFontHeader3Size:1.5rem;--sapFontHeader4Size:1.25rem;--sapFontHeader5Size:1rem;--sapFontHeader6Size:.875rem;--sapTextColor:#eaecee;--sapLinkColor:#4db1ff;--sapLink_Hover_Color:#29a1ff;--sapLink_Active_Color:#4db1ff;--sapLink_Visited_Color:#4db1ff;--sapLink_InvertedColor:#bde2ff;--sapLink_SubtleColor:#eaecee;--sapCompanyLogo:none;--sapBackgroundImage:none;--sapBackgroundImageOpacity:1.0;--sapBackgroundImageRepeat:false;--sapSelectedColor:#4db1ff;--sapActiveColor:#020303;--sapHighlightTextColor:#1d232a;--sapTitleColor:#eaecee;--sapNegativeColor:#fa6161;--sapCriticalColor:#ffdf72;--sapPositiveColor:#97dd40;--sapInformativeColor:#4db1ff;--sapNeutralColor:#a9b4be;--sapNegativeElementColor:#fa6161;--sapCriticalElementColor:#f7bf00;--sapPositiveElementColor:#6dad1f;--sapInformativeElementColor:#4db1ff;--sapNeutralElementColor:#a9b4be;--sapNegativeTextColor:#fa6161;--sapPositiveTextColor:#97dd40;--sapCriticalTextColor:#ffdf72;--sapInformativeTextColor:#4db1ff;--sapNeutralTextColor:#eaecee;--sapNeutralBorderColor:#a9b4be;--sapErrorColor:#fa6161;--sapErrorBorderColor:#fa6161;--sapWarningColor:#ffdf72;--sapWarningBorderColor:#f7bf00;--sapSuccessColor:#97dd40;--sapSuccessBorderColor:#6dad1f;--sapInformationColor:#4db1ff;--sapInformationBorderColor:#4db1ff;--sapErrorBackground:#350000;--sapWarningBackground:#382700;--sapSuccessBackground:#11331a;--sapInformationBackground:#00144a;--sapNeutralBackground:#242e38;--sapIndicationColor_1:#fd3535;--sapIndicationColor_1_Background:#fd3535;--sapIndicationColor_1_BorderColor:#fd3535;--sapIndicationColor_1_Hover_Background:#fd4e4e;--sapIndicationColor_1_Active_Background:#fe6767;--sapIndicationColor_1_TextColor:#eaecee;--sapIndicationColor_2:#ff8f8f;--sapIndicationColor_2_Background:#ff8f8f;--sapIndicationColor_2_BorderColor:#ff8f8f;--sapIndicationColor_2_Hover_Background:#ffa9a9;--sapIndicationColor_2_Active_Background:#ffc2c2;--sapIndicationColor_2_TextColor:#1d232a;--sapIndicationColor_3:#ffc933;--sapIndicationColor_3_Background:#ffc933;--sapIndicationColor_3_BorderColor:#ffc933;--sapIndicationColor_3_Hover_Background:#ffcd42;--sapIndicationColor_3_Active_Background:#ffd152;--sapIndicationColor_3_TextColor:#1d232a;--sapIndicationColor_4:#bde986;--sapIndicationColor_4_Background:#bde986;--sapIndicationColor_4_BorderColor:#bde986;--sapIndicationColor_4_Hover_Background:#c9ed9c;--sapIndicationColor_4_Active_Background:#d5f1b1;--sapIndicationColor_4_TextColor:#1d232a;--sapIndicationColor_5:#a6e0ff;--sapIndicationColor_5_Background:#a6e0ff;--sapIndicationColor_5_BorderColor:#a6e0ff;--sapIndicationColor_5_Hover_Background:#c0e9ff;--sapIndicationColor_5_Active_Background:#d9f2ff;--sapIndicationColor_5_TextColor:#1d232a;--sapIndicationColor_6:#64edd2;--sapIndicationColor_6_Background:#64edd2;--sapIndicationColor_6_BorderColor:#64edd2;--sapIndicationColor_6_Hover_Background:#7bf0d9;--sapIndicationColor_6_Active_Background:#92f2df;--sapIndicationColor_6_TextColor:#1d232a;--sapIndicationColor_7:#d3b6ff;--sapIndicationColor_7_Background:#d3b6ff;--sapIndicationColor_7_BorderColor:#d3b6ff;--sapIndicationColor_7_Hover_Background:#e2d0ff;--sapIndicationColor_7_Active_Background:#f2e9ff;--sapIndicationColor_7_TextColor:#1d232a;--sapIndicationColor_8:#ff8af0;--sapIndicationColor_8_Background:#ff8af0;--sapIndicationColor_8_BorderColor:#ff8af0;--sapIndicationColor_8_Hover_Background:#ffa3f3;--sapIndicationColor_8_Active_Background:#ffbdf7;--sapIndicationColor_8_TextColor:#1d232a;--sapElement_LineHeight:2.75rem;--sapElement_Height:2.25rem;--sapElement_BorderWidth:.0625rem;--sapElement_BorderCornerRadius:.75rem;--sapElement_Compact_LineHeight:2rem;--sapElement_Compact_Height:1.625rem;--sapElement_Condensed_LineHeight:1.5rem;--sapElement_Condensed_Height:1.375rem;--sapContent_LineHeight:1.5;--sapContent_IconHeight:1rem;--sapContent_IconColor:#eaecee;--sapContent_ContrastIconColor:#1d232a;--sapContent_NonInteractiveIconColor:#a9b4be;--sapContent_MarkerIconColor:#d3b6ff;--sapContent_MarkerTextColor:#64edd2;--sapContent_MeasureIndicatorColor:#a9b4be;--sapContent_Selected_MeasureIndicatorColor:#4db1ff;--sapContent_ImagePlaceholderBackground:#45617c;--sapContent_ImagePlaceholderForegroundColor:#d5dadd;--sapContent_RatedColor:#ffdf72;--sapContent_UnratedColor:#a9b4be;--sapContent_BusyColor:#eaecee;--sapContent_FocusColor:#4db1ff;--sapContent_FocusStyle:solid;--sapContent_FocusWidth:.125rem;--sapContent_ContrastFocusColor:#fff;--sapContent_ShadowColor:#000;--sapContent_ContrastShadowColor:#fff;--sapContent_Shadow0:0 0 0.125rem 0 hsla(0,0%,100%,0.2),0 0.125rem 0.5rem 0 rgba(0,0,0,0.3);--sapContent_Shadow1:0 0 0 0.0625rem hsla(0,0%,100%,0.35),0 0.125rem 0.5rem 0 rgba(0,0,0,0.6);--sapContent_Shadow2:0 0 0 0.0625rem hsla(0,0%,100%,0.35),0 0.625rem 1.875rem 0 rgba(0,0,0,0.6);--sapContent_Shadow3:0 0 0 0.0625rem hsla(0,0%,100%,0.35),0 1.25rem 5rem 0 rgba(0,0,0,0.6);--sapContent_TextShadow:0 0 0.125rem #000;--sapContent_ContrastTextShadow:none;--sapContent_HeaderShadow:0 0.125rem 0.125rem 0 rgba(0,0,0,0.2),inset 0 -0.0625rem 0 0 #2e3742;--sapContent_Interaction_Shadow:0 0 0.125rem 0 rgba(169,180,190,0.72);--sapContent_Selected_Shadow:0 0 0.125rem 0 rgba(77,177,255,0.72);--sapContent_Negative_Shadow:0 0 0.125rem 0 rgba(250,97,97,0.72);--sapContent_Critical_Shadow:0 0 0.125rem 0 rgba(255,223,114,0.72);--sapContent_Positive_Shadow:0 0 0.125rem 0 rgba(151,221,64,0.72);--sapContent_Informative_Shadow:0 0 0.125rem 0 rgba(77,177,255,0.72);--sapContent_Neutral_Shadow:0 0 0.125rem 0 rgba(169,180,190,0.72);--sapContent_SearchHighlightColor:#046c7a;--sapContent_HelpColor:#5dc122;--sapContent_LabelColor:#8396a8;--sapContent_MonospaceFontFamily:\"72Mono\",\"72Monofull\",lucida console,monospace;--sapContent_MonospaceBoldFontFamily:\"72Mono-Bold\",\"72Mono-Boldfull\",lucida console,monospace;--sapContent_IconFontFamily:\"SAP-icons\";--sapContent_DisabledTextColor:rgba(234,236,238,0.6);--sapContent_DisabledOpacity:0.4;--sapContent_ContrastTextThreshold:0.5;--sapContent_ContrastTextColor:#1d232a;--sapContent_ForegroundColor:#101418;--sapContent_ForegroundBorderColor:#a9b4be;--sapContent_ForegroundTextColor:#eaecee;--sapContent_BadgeBackground:#ff8cb2;--sapContent_BadgeTextColor:#1d232a;--sapContent_Placeholderloading_Background:#475566;--sapContent_Placeholderloading_Gradient:linear-gradient(90deg,#475566 0%,#475566 20%,#74879f 50%,#475566 80%,#475566);--sapContent_DragAndDropActiveColor:#4db1ff;--sapContent_Selected_Background:#1d232a;--sapContent_Selected_TextColor:#4db1ff;--sapContent_Selected_Hover_Background:#1d232a;--sapContent_Selected_ForegroundColor:#4db1ff;--sapContent_ForcedColorAdjust:none;--sapContent_Illustrative_Color1:#5d36ff;--sapContent_Illustrative_Color2:#4098ff;--sapContent_Illustrative_Color3:#f58b00;--sapContent_Illustrative_Color4:#5581ae;--sapContent_Illustrative_Color5:#fff;--sapContent_Illustrative_Color6:#b9c1c6;--sapContent_Illustrative_Color7:#223548;--sapContent_Illustrative_Color8:#fff;--sapContent_Illustrative_Color9:#64edd2;--sapContent_Illustrative_Color10:#ebf8ff;--sapContent_Illustrative_Color11:#f31ded;--sapContent_Illustrative_Color12:#00a800;--sapContent_Illustrative_Color13:#1782ff;--sapContent_Illustrative_Color14:#0070f3;--sapContent_Illustrative_Color15:#cc7400;--sapContent_Illustrative_Color16:#3b0ac6;--sapContent_Illustrative_Color17:#00a58a;--sapContent_Illustrative_Color18:#2a4259;--sapContent_Illustrative_Color19:#324e6b;--sapContent_Illustrative_Color20:#3b5b7c;--sapShell_Background:#12171c;--sapShell_BackgroundImage:linear-gradient(180deg,#12171c,#12171c);--sapShell_BackgroundGradient:linear-gradient(180deg,#12171c,#12171c);--sapShell_BackgroundImageOpacity:1.0;--sapShell_BackgroundImageRepeat:false;--sapShell_BorderColor:#1d232a;--sapShell_TextColor:#eaecee;--sapShell_InteractiveBackground:#242e38;--sapShell_InteractiveTextColor:#eaecee;--sapShell_InteractiveBorderColor:#a9b4be;--sapShell_GroupTitleTextColor:#eaecee;--sapShell_GroupTitleTextShadow:0 0 .125rem #000;--sapShell_Hover_Background:#1d232a;--sapShell_Active_Background:#1d232a;--sapShell_Active_TextColor:#4db1ff;--sapShell_Selected_Background:#1d232a;--sapShell_Selected_TextColor:#4db1ff;--sapShell_Selected_Hover_Background:#1d232a;--sapShell_Favicon:none;--sapShell_Navigation_Background:#1d232a;--sapShell_Navigation_SelectedColor:#eaecee;--sapShell_Navigation_Selected_TextColor:#eaecee;--sapShell_Navigation_TextColor:#eaecee;--sapShell_Navigation_Hover_Background:#1d232a;--sapShell_Navigation_Active_Background:#1d232a;--sapShell_Navigation_Active_TextColor:#4db1ff;--sapShell_Shadow:0 0.125rem 0.125rem 0 rgba(0,0,0,0.8),inset 0 -0.0625rem 0 0 hsla(0,0%,100%,0.2);--sapShell_NegativeColor:#fa6161;--sapShell_CriticalColor:#ffdf72;--sapShell_PositiveColor:#97dd40;--sapShell_InformativeColor:#4db1ff;--sapShell_NeutralColor:#eaecee;--sapAvatar_1_Background:#ae4000;--sapAvatar_1_BorderColor:#ae4000;--sapAvatar_1_TextColor:#ffdf72;--sapAvatar_2_Background:#890506;--sapAvatar_2_BorderColor:#890506;--sapAvatar_2_TextColor:#ff8cb2;--sapAvatar_3_Background:#b40569;--sapAvatar_3_BorderColor:#b40569;--sapAvatar_3_TextColor:#fecbda;--sapAvatar_4_Background:#8700b8;--sapAvatar_4_BorderColor:#8700b8;--sapAvatar_4_TextColor:#ffafed;--sapAvatar_5_Background:#470cf1;--sapAvatar_5_BorderColor:#470cf1;--sapAvatar_5_TextColor:#d3b6ff;--sapAvatar_6_Background:#0054cc;--sapAvatar_6_BorderColor:#0054cc;--sapAvatar_6_TextColor:#a6e0ff;--sapAvatar_7_Background:#036573;--sapAvatar_7_BorderColor:#036573;--sapAvatar_7_TextColor:#64edd2;--sapAvatar_8_Background:#236c39;--sapAvatar_8_BorderColor:#236c39;--sapAvatar_8_TextColor:#bde986;--sapAvatar_9_Background:#4e247a;--sapAvatar_9_BorderColor:#4e247a;--sapAvatar_9_TextColor:#b995e0;--sapAvatar_10_Background:#45617c;--sapAvatar_10_BorderColor:#45617c;--sapAvatar_10_TextColor:#d5dadd;--sapButton_BorderWidth:.0625rem;--sapButton_BorderCornerRadius:.5rem;--sapButton_Background:#2e3b47;--sapButton_BorderColor:#2e3b47;--sapButton_TextColor:#eaecee;--sapButton_Hover_Background:#1d232a;--sapButton_Hover_BorderColor:#1d232a;--sapButton_Hover_TextColor:#eaecee;--sapButton_IconColor:#eaecee;--sapButton_Active_Background:#213131;--sapButton_Active_BorderColor:#4db1ff;--sapButton_Active_TextColor:#4db1ff;--sapButton_Emphasized_Background:#0070f2;--sapButton_Emphasized_BorderColor:#0070f2;--sapButton_Emphasized_TextColor:#eaecee;--sapButton_Emphasized_Hover_Background:#0064d9;--sapButton_Emphasized_Hover_BorderColor:#0064d9;--sapButton_Emphasized_Hover_TextColor:#eaecee;--sapButton_Emphasized_Active_Background:#213131;--sapButton_Emphasized_Active_BorderColor:#4db1ff;--sapButton_Emphasized_Active_TextColor:#4db1ff;--sapButton_Emphasized_TextShadow:transparent;--sapButton_Emphasized_FontWeight:bold;--sapButton_Reject_Background:#490000;--sapButton_Reject_BorderColor:#490000;--sapButton_Reject_Hover_Background:#1d232a;--sapButton_Reject_Hover_BorderColor:#1d232a;--sapButton_Reject_Hover_TextColor:#fa6161;--sapButton_Reject_Active_Background:#213131;--sapButton_Reject_Active_BorderColor:#fa6161;--sapButton_Reject_Active_TextColor:#fa6161;--sapButton_Reject_TextColor:#fa6161;--sapButton_Reject_Selected_Background:#213131;--sapButton_Reject_Selected_BorderColor:#fa6161;--sapButton_Reject_Selected_TextColor:#fa6161;--sapButton_Reject_Selected_Hover_Background:#213131;--sapButton_Reject_Selected_Hover_BorderColor:#fa6161;--sapButton_Accept_Background:#153e20;--sapButton_Accept_BorderColor:#153e20;--sapButton_Accept_Hover_Background:#1d232a;--sapButton_Accept_Hover_BorderColor:#1d232a;--sapButton_Accept_Hover_TextColor:#97dd40;--sapButton_Accept_Active_Background:#213131;--sapButton_Accept_Active_BorderColor:#6dad1f;--sapButton_Accept_Active_TextColor:#97dd40;--sapButton_Accept_TextColor:#97dd40;--sapButton_Accept_Selected_Background:#213131;--sapButton_Accept_Selected_BorderColor:#6dad1f;--sapButton_Accept_Selected_TextColor:#97dd40;--sapButton_Accept_Selected_Hover_Background:#1d232a;--sapButton_Accept_Selected_Hover_BorderColor:#6dad1f;--sapButton_Lite_Background:transparent;--sapButton_Lite_BorderColor:transparent;--sapButton_Lite_TextColor:#4db1ff;--sapButton_Lite_Hover_Background:#1d232a;--sapButton_Lite_Hover_BorderColor:#1d232a;--sapButton_Lite_Hover_TextColor:#4db1ff;--sapButton_Lite_Active_Background:#213131;--sapButton_Lite_Active_BorderColor:#4db1ff;--sapButton_Selected_Background:#1d232a;--sapButton_Selected_BorderColor:#4db1ff;--sapButton_Selected_TextColor:#4db1ff;--sapButton_Selected_Hover_Background:#1d232a;--sapButton_Selected_Hover_BorderColor:#4db1ff;--sapButton_Attention_Background:#382700;--sapButton_Attention_BorderColor:#382700;--sapButton_Attention_TextColor:#ffdf72;--sapButton_Attention_Hover_Background:#1d232a;--sapButton_Attention_Hover_BorderColor:#1d232a;--sapButton_Attention_Hover_TextColor:#ffdf72;--sapButton_Attention_Active_Background:#213131;--sapButton_Attention_Active_BorderColor:#f7bf00;--sapButton_Attention_Active_TextColor:#ffdf72;--sapButton_Attention_Selected_Background:#213131;--sapButton_Attention_Selected_BorderColor:#f7bf00;--sapButton_Attention_Selected_TextColor:#ffdf72;--sapButton_Attention_Selected_Hover_Background:#213131;--sapButton_Attention_Selected_Hover_BorderColor:#f7bf00;--sapButton_Negative_Background:#fa6161;--sapButton_Negative_BorderColor:#fa6161;--sapButton_Negative_TextColor:#1d232a;--sapButton_Negative_Hover_Background:#fb7a7a;--sapButton_Negative_Hover_BorderColor:#fb7a7a;--sapButton_Negative_Hover_TextColor:#1d232a;--sapButton_Negative_Active_Background:#fc9292;--sapButton_Negative_Active_BorderColor:#fc9292;--sapButton_Negative_Active_TextColor:#1d232a;--sapButton_Critical_Background:#f7bf00;--sapButton_Critical_BorderColor:#f7bf00;--sapButton_Critical_TextColor:#1d232a;--sapButton_Critical_Hover_Background:#ffcf2b;--sapButton_Critical_Hover_BorderColor:#ffcf2b;--sapButton_Critical_Hover_TextColor:#1d232a;--sapButton_Critical_Active_Background:#ffd43f;--sapButton_Critical_Active_BorderColor:#ffd43f;--sapButton_Critical_Active_TextColor:#1d232a;--sapButton_Success_Background:#6dad1f;--sapButton_Success_BorderColor:#6dad1f;--sapButton_Success_TextColor:#1d232a;--sapButton_Success_Hover_Background:#7bc323;--sapButton_Success_Hover_BorderColor:#7bc323;--sapButton_Success_Hover_TextColor:#1d232a;--sapButton_Success_Active_Background:#88d827;--sapButton_Success_Active_BorderColor:#88d827;--sapButton_Success_Active_TextColor:#1d232a;--sapButton_Information_Background:#4db1ff;--sapButton_Information_BorderColor:#4db1ff;--sapButton_Information_TextColor:#1d232a;--sapButton_Information_Hover_Background:#67bcff;--sapButton_Information_Hover_BorderColor:#67bcff;--sapButton_Information_Hover_TextColor:#1d232a;--sapButton_Information_Active_Background:#80c7ff;--sapButton_Information_Active_BorderColor:#80c7ff;--sapButton_Information_Active_TextColor:#1d232a;--sapButton_Neutral_Background:#a9b4be;--sapButton_Neutral_BorderColor:#a9b4be;--sapButton_Neutral_TextColor:#1d232a;--sapButton_Neutral_Hover_Background:#b8c1c9;--sapButton_Neutral_Hover_BorderColor:#b8c1c9;--sapButton_Neutral_Hover_TextColor:#1d232a;--sapButton_Neutral_Active_Background:#c6cdd4;--sapButton_Neutral_Active_BorderColor:#c6cdd4;--sapButton_Neutral_Active_TextColor:#1d232a;--sapButton_Track_Background:#a9b4be;--sapButton_Track_BorderColor:#a9b4be;--sapButton_Track_TextColor:#1d232a;--sapButton_Track_Hover_Background:#b8c1c9;--sapButton_Track_Hover_BorderColor:#b8c1c9;--sapButton_Track_Selected_Background:#4db1ff;--sapButton_Track_Selected_BorderColor:#4db1ff;--sapButton_Track_Selected_TextColor:#1d232a;--sapButton_Track_Selected_Hover_Background:#67bcff;--sapButton_Track_Selected_Hover_BorderColor:#67bcff;--sapButton_Handle_Background:#1d232a;--sapButton_Handle_BorderColor:#1d232a;--sapButton_Handle_TextColor:#eaecee;--sapButton_Handle_Hover_Background:#1d232a;--sapButton_Handle_Hover_BorderColor:rgba(29,35,42,0.5);--sapButton_Handle_Selected_Background:#1d232a;--sapButton_Handle_Selected_BorderColor:#1d232a;--sapButton_Handle_Selected_TextColor:#4db1ff;--sapButton_Handle_Selected_Hover_Background:#1d232a;--sapButton_Handle_Selected_Hover_BorderColor:rgba(29,35,42,0.5);--sapButton_Track_Negative_Background:#fa6161;--sapButton_Track_Negative_BorderColor:#fa6161;--sapButton_Track_Negative_TextColor:#1d232a;--sapButton_Track_Negative_Hover_Background:#fb7a7a;--sapButton_Track_Negative_Hover_BorderColor:#fb7a7a;--sapButton_Handle_Negative_Background:#1d232a;--sapButton_Handle_Negative_BorderColor:#1d232a;--sapButton_Handle_Negative_TextColor:#fa6161;--sapButton_Handle_Negative_Hover_Background:#1d232a;--sapButton_Handle_Negative_Hover_BorderColor:rgba(29,35,42,0.5);--sapButton_Track_Positive_Background:#6dad1f;--sapButton_Track_Positive_BorderColor:#6dad1f;--sapButton_Track_Positive_TextColor:#1d232a;--sapButton_Track_Positive_Hover_Background:#7bc323;--sapButton_Track_Positive_Hover_BorderColor:#7bc323;--sapButton_Handle_Positive_Background:#1d232a;--sapButton_Handle_Positive_BorderColor:#1d232a;--sapButton_Handle_Positive_TextColor:#97dd40;--sapButton_Handle_Positive_Hover_Background:#1d232a;--sapButton_Handle_Positive_Hover_BorderColor:rgba(29,35,42,0.5);--sapButton_TokenBackground:#1d232a;--sapButton_TokenBorderColor:#a9b4be;--sapField_Background:#242e38;--sapField_BackgroundStyle:0 100%/100% .0625rem no-repeat linear-gradient(0deg,#a9b4be,#a9b4be) border-box;--sapField_TextColor:#fff;--sapField_PlaceholderTextColor:#8396a8;--sapField_BorderColor:#a9b4be;--sapField_HelpBackground:#242e38;--sapField_BorderWidth:.0625rem;--sapField_BorderStyle:solid;--sapField_BorderCornerRadius:.25rem;--sapField_Hover_Background:#1d232a;--sapField_Hover_BackgroundStyle:0 100%/100% .0625rem no-repeat linear-gradient(0deg,#a9b4be,#a9b4be) border-box;--sapField_Hover_BorderColor:#a9b4be;--sapField_Hover_HelpBackground:#1d232a;--sapField_Active_BorderColor:#4db1ff;--sapField_Focus_Background:#1d232a;--sapField_Focus_BorderColor:#4db1ff;--sapField_Focus_HelpBackground:#1d232a;--sapField_ReadOnly_Background:transparent;--sapField_ReadOnly_BorderColor:#a9b4be;--sapField_ReadOnly_HelpBackground:transparent;--sapField_RequiredColor:#ff78a4;--sapField_InvalidColor:#fa6161;--sapField_InvalidBackground:#350000;--sapField_InvalidBackgroundStyle:0 100%/100% .125rem no-repeat linear-gradient(0deg,#fa6161,#fa6161) border-box;--sapField_InvalidBorderWidth:.125rem;--sapField_InvalidBorderStyle:solid;--sapField_WarningColor:#f7bf00;--sapField_WarningBackground:#382700;--sapField_WarningBackgroundStyle:0 100%/100% .125rem no-repeat linear-gradient(0deg,#f7bf00,#f7bf00) border-box;--sapField_WarningBorderWidth:.125rem;--sapField_WarningBorderStyle:solid;--sapField_SuccessColor:#6dad1f;--sapField_SuccessBackground:#11331a;--sapField_SuccessBackgroundStyle:0 100%/100% .0625rem no-repeat linear-gradient(0deg,#6dad1f,#6dad1f) border-box;--sapField_SuccessBorderWidth:.0625rem;--sapField_SuccessBorderStyle:solid;--sapField_InformationColor:#4db1ff;--sapField_InformationBackground:#00144a;--sapField_InformationBackgroundStyle:0 100%/100% .125rem no-repeat linear-gradient(0deg,#4db1ff,#4db1ff) border-box;--sapField_InformationBorderWidth:.125rem;--sapField_InformationBorderStyle:solid;--sapGroup_TitleBackground:#1d232a;--sapGroup_TitleBorderColor:#768ea5;--sapGroup_TitleTextColor:#eaecee;--sapGroup_Title_FontSize:1rem;--sapGroup_ContentBackground:#1d232a;--sapGroup_ContentBorderColor:#323c48;--sapGroup_BorderWidth:.0625rem;--sapGroup_BorderCornerRadius:.5rem;--sapGroup_FooterBackground:transparent;--sapPopover_BorderCornerRadius:.5rem;--sapToolbar_Background:#1d232a;--sapToolbar_SeparatorColor:#3c4957;--sapList_HeaderBackground:#1d232a;--sapList_HeaderBorderColor:#768ea5;--sapList_HeaderTextColor:#eaecee;--sapList_BorderColor:#2e3742;--sapList_TextColor:#eaecee;--sapList_Active_TextColor:#eaecee;--sapList_BorderWidth:.0625rem;--sapList_Active_Background:#020303;--sapList_SelectionBackgroundColor:#1d2d3e;--sapList_SelectionBorderColor:#4db1ff;--sapList_Hover_SelectionBackground:#223548;--sapList_Background:#1d232a;--sapList_Hover_Background:#232b33;--sapList_AlternatingBackground:#12171c;--sapList_GroupHeaderBackground:#1d232a;--sapList_GroupHeaderBorderColor:#768ea5;--sapList_GroupHeaderTextColor:#eaecee;--sapList_FooterBackground:#1d232a;--sapList_FooterTextColor:#eaecee;--sapList_TableGroupHeaderBackground:#0c0f13;--sapList_TableGroupHeaderBorderColor:#768ea5;--sapList_TableGroupHeaderTextColor:#eaecee;--sapList_TableFooterBorder:#768ea5;--sapList_TableFixedBorderColor:#6f829a;--sapMessage_ErrorBorderColor:#910000;--sapMessage_WarningBorderColor:#845c00;--sapMessage_SuccessBorderColor:#246c37;--sapMessage_InformationBorderColor:#0034bf;--sapProgress_Background:#2e3b48;--sapProgress_BorderColor:#2e3b48;--sapProgress_TextColor:#eaecee;--sapProgress_FontSize:.875rem;--sapProgress_NegativeBackground:#680000;--sapProgress_NegativeBorderColor:#680000;--sapProgress_NegativeTextColor:#eaecee;--sapProgress_CriticalBackground:#6b4b00;--sapProgress_CriticalBorderColor:#6b4b00;--sapProgress_CriticalTextColor:#eaecee;--sapProgress_PositiveBackground:#174624;--sapProgress_PositiveBorderColor:#174624;--sapProgress_PositiveTextColor:#eaecee;--sapProgress_InformationBackground:#001b64;--sapProgress_InformationBorderColor:#001b64;--sapProgress_InformationTextColor:#eaecee;--sapProgress_Value_Background:#a9b4be;--sapProgress_Value_BorderColor:#2e3b48;--sapProgress_Value_TextColor:#a9b4be;--sapProgress_Value_NegativeBackground:#fa6161;--sapProgress_Value_NegativeBorderColor:#680000;--sapProgress_Value_NegativeTextColor:#fa6161;--sapProgress_Value_CriticalBackground:#f7bf00;--sapProgress_Value_CriticalBorderColor:#6b4b00;--sapProgress_Value_CriticalTextColor:#f7bf00;--sapProgress_Value_PositiveBackground:#6dad1f;--sapProgress_Value_PositiveBorderColor:#174624;--sapProgress_Value_PositiveTextColor:#6dad1f;--sapProgress_Value_InformationBackground:#4db1ff;--sapProgress_Value_InformationBorderColor:#001b64;--sapProgress_Value_InformationTextColor:#4db1ff;--sapScrollBar_FaceColor:#647891;--sapScrollBar_TrackColor:#1d232a;--sapScrollBar_BorderColor:#647891;--sapScrollBar_SymbolColor:#eaecee;--sapScrollBar_Dimension:.75rem;--sapScrollBar_Hover_FaceColor:#5c6e85;--sapSlider_Background:#2e3b48;--sapSlider_BorderColor:#2e3b48;--sapSlider_Selected_Background:#4db1ff;--sapSlider_Selected_BorderColor:#4db1ff;--sapSlider_HandleBackground:#1d232a;--sapSlider_HandleBorderColor:#1d232a;--sapSlider_RangeHandleBackground:#1d232a;--sapSlider_Hover_HandleBackground:#1d232a;--sapSlider_Hover_HandleBorderColor:#4db1ff;--sapSlider_Hover_RangeHandleBackground:transparent;--sapSlider_Active_HandleBackground:#213131;--sapSlider_Active_HandleBorderColor:#213131;--sapSlider_Active_RangeHandleBackground:transparent;--sapPageHeader_Background:#1d232a;--sapPageHeader_BorderColor:#2e3742;--sapPageHeader_TextColor:#eaecee;--sapPageFooter_Background:#1d232a;--sapPageFooter_BorderColor:#2e3742;--sapPageFooter_TextColor:#eaecee;--sapInfobar_Background:#036573;--sapInfobar_Hover_Background:#1d232a;--sapInfobar_Active_Background:#1d232a;--sapInfobar_NonInteractive_Background:#12171c;--sapInfobar_TextColor:#64edd2;--sapObjectHeader_Background:#1d232a;--sapObjectHeader_BorderColor:#2e3742;--sapObjectHeader_Hover_Background:#232b33;--sapObjectHeader_Title_TextColor:#eaecee;--sapObjectHeader_Title_FontSize:2rem;--sapObjectHeader_Title_SnappedFontSize:1.25rem;--sapObjectHeader_Title_FontFamily:\"72Black\",\"72\",\"72full\",Arial,Helvetica,sans-serif;--sapObjectHeader_Subtitle_TextColor:#8396a8;--sapBlockLayer_Background:#000;--sapTile_Background:#1d232a;--sapTile_Hover_Background:#1d232a;--sapTile_Active_Background:#15191e;--sapTile_BorderColor:transparent;--sapTile_BorderCornerRadius:1rem;--sapTile_TitleTextColor:#eaecee;--sapTile_TextColor:#8396a8;--sapTile_IconColor:#8396a8;--sapTile_SeparatorColor:#475566;--sapTile_Interactive_BorderColor:#5b6e85;--sapTile_OverlayBackground:rgba(29,35,42,0.96);--sapTile_OverlayForegroundColor:#eaecee;--sapAccentColor1:#ffdf72;--sapAccentColor2:#ff8cb2;--sapAccentColor3:#fecbda;--sapAccentColor4:#ffafed;--sapAccentColor5:#d3b6ff;--sapAccentColor6:#a6e0ff;--sapAccentColor7:#64edd2;--sapAccentColor8:#bde986;--sapAccentColor9:#b995e0;--sapAccentColor10:#d5dadd;--sapAccentBackgroundColor1:#ae4000;--sapAccentBackgroundColor2:#890506;--sapAccentBackgroundColor3:#b40569;--sapAccentBackgroundColor4:#8700b8;--sapAccentBackgroundColor5:#470cf1;--sapAccentBackgroundColor6:#0054cc;--sapAccentBackgroundColor7:#036573;--sapAccentBackgroundColor8:#236c39;--sapAccentBackgroundColor9:#4e247a;--sapAccentBackgroundColor10:#45617c;--sapLegend_WorkingBackground:#1d232a;--sapLegend_NonWorkingBackground:#0c0f12;--sapLegend_CurrentDateTime:#ffafed;--sapLegendColor1:#ffb300;--sapLegendColor2:#f5734b;--sapLegendColor3:#feabc8;--sapLegendColor4:#db7070;--sapLegendColor5:#ff8af0;--sapLegendColor6:#89d1ff;--sapLegendColor7:#2ce0bf;--sapLegendColor8:#97dd40;--sapLegendColor9:#a9b4be;--sapLegendColor10:#aa7dd9;--sapLegendColor11:#f58b00;--sapLegendColor12:#fbbfac;--sapLegendColor13:#ffa1a1;--sapLegendColor14:#ff9e74;--sapLegendColor15:#af9cc3;--sapLegendColor16:#aabce3;--sapLegendColor17:#dafdf5;--sapLegendColor18:#d5f1b1;--sapLegendColor19:#d1efff;--sapLegendColor20:#e2d8ff;--sapLegendBackgroundColor1:#382700;--sapLegendBackgroundColor2:#501605;--sapLegendBackgroundColor3:#510136;--sapLegendBackgroundColor4:#411c1c;--sapLegendBackgroundColor5:#28004a;--sapLegendBackgroundColor6:#00144a;--sapLegendBackgroundColor7:#012931;--sapLegendBackgroundColor8:#1f2519;--sapLegendBackgroundColor9:#182430;--sapLegendBackgroundColor10:#30164b;--sapLegendBackgroundColor11:#571400;--sapLegendBackgroundColor12:#360c03;--sapLegendBackgroundColor13:#3d0000;--sapLegendBackgroundColor14:#421502;--sapLegendBackgroundColor15:#332640;--sapLegendBackgroundColor16:#121d35;--sapLegendBackgroundColor17:#013131;--sapLegendBackgroundColor18:#1e3009;--sapLegendBackgroundColor19:#0a285c;--sapLegendBackgroundColor20:#1c0c6e;--sapChart_OrderedColor_1:#1b90ff;--sapChart_OrderedColor_2:#f26018;--sapChart_OrderedColor_3:#179c6f;--sapChart_OrderedColor_4:#f62866;--sapChart_OrderedColor_5:#863fd5;--sapChart_OrderedColor_6:#04a29d;--sapChart_OrderedColor_7:#0070f2;--sapChart_OrderedColor_8:#cc00dc;--sapChart_OrderedColor_9:#8396a8;--sapChart_OrderedColor_10:#f54747;--sapChart_OrderedColor_11:#20578c;--sapChart_Bad:#f53232;--sapChart_Critical:#e76500;--sapChart_Good:#30914c;--sapChart_Neutral:#788fa6;--sapChart_Sequence_1:#1b90ff;--sapChart_Sequence_2:#f26018;--sapChart_Sequence_3:#179c6f;--sapChart_Sequence_4:#f62866;--sapChart_Sequence_5:#863fd5;--sapChart_Sequence_6:#04a29d;--sapChart_Sequence_7:#0070f2;--sapChart_Sequence_8:#cc00dc;--sapChart_Sequence_9:#8396a8;--sapChart_Sequence_10:#f54747;--sapChart_Sequence_11:#20578c;--sapChart_Sequence_Neutral:#788fa6;}"};

	return parametersBundle_css;

});

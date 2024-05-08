// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { vueFetch } from 'use-lightweight-fetch';
import { Module } from 'vuex';

// get images
const {
  handleData: handlegetElements,
  fetchedData: fetchedComponents,
  isError: isErrorComponents,
  error: errorComponents,
  errors: errorsComponents,
  isLoading: isLoadingComponents,
  isSuccess: isSuccessComponents
} = vueFetch();

export type DesignerStateType = {
  menuPreview: boolean;
  menuLeft: boolean;
  menuRight: boolean;
  borderStyle: any;
  borderWidth: any;
  borderColor: any;
  borderRadiusGlobal: any;
  borderRadiusTopLeft: any;
  borderRadiusTopRight: any;
  borderRadiusBottomleft: any;
  borderRadiusBottomRight: any;
  elementContainsHyperlink: any;
  hyperlinkAbility: any;
  hyperlinkInput: any;
  hyperlinkMessage: any;
  hyperlinkError: any;
  hyberlinkEnable: boolean;
  openHyperlinkinkInNewTab: any;
  opacity: any;
  backgroundOpacity: any;
  textAreaVueModel: any;
  nextSibling: any;
  parentElement: any;
  restoredElement: any;
  currentClasses: any[];
  fontVerticalPadding: any;
  fontHorizontalPadding: any;
  fontVerticalMargin: any;
  fontHorizontalMargin: any;
  fontStyle: any;
  fontFamily: any;
  fontWeight: any;
  fontBase: any;
  fontDesktop: any;
  fontTablet: any;
  fontMobile: any;
  enabledCustomColorBackground: any;
  backgroundColorCustom: any;
  backgroundColor: any;
  enabledCustomColorText: any;
  textColorCustom: any;
  textColor: any;
  element: any;
  component: any;
  components: any[];
  basePrimaryImage: any;
  highlightedImage: any;
  fetchedComponents: Array<ComponentItemType>;
};

export type ComponentItemType = {
  category: string;
  html: string;
  imageSrc: string;
  name: string;
};

const designerStore: Module<DesignerStateType, any> = {
  namespaced: true,
  // state
  state: {
    menuPreview: false,
    menuLeft: true,
    menuRight: true,
    // border style, width & color / start
    borderStyle: null,
    borderWidth: null,
    borderColor: null,
    // border style, width & color / end
    // border radius / start
    borderRadiusGlobal: null,
    borderRadiusTopLeft: null,
    borderRadiusTopRight: null,
    borderRadiusBottomleft: null,
    borderRadiusBottomRight: null,
    // border radius / end
    // hyperlink / start
    elementContainsHyperlink: null,
    hyperlinkAbility: null,
    hyperlinkInput: null,
    hyperlinkMessage: null,
    hyperlinkError: null,
    hyberlinkEnable: false,
    openHyperlinkinkInNewTab: null,
    // hyperlink / end
    opacity: null,
    backgroundOpacity: null,
    textAreaVueModel: null,
    nextSibling: null,
    parentElement: null,
    restoredElement: null,
    currentClasses: [],
    fontVerticalPadding: null,
    fontHorizontalPadding: null,
    fontVerticalMargin: null,
    fontHorizontalMargin: null,
    fontStyle: null,
    fontFamily: null,
    fontWeight: null,
    fontBase: null,
    fontDesktop: null,
    fontTablet: null,
    fontMobile: null,
    // background color / start
    enabledCustomColorBackground: null,
    backgroundColorCustom: null,
    backgroundColor: null,
    // background color / end
    // text color / start
    enabledCustomColorText: null,
    textColorCustom: null,
    textColor: null,
    // text color / end
    element: null,
    component: null,
    components: [],
    basePrimaryImage: null,
    highlightedImage: null,
    fetchedComponents: []
  },

  // getters
  getters: {
    getMenuPreview(state) {
      return state.menuPreview;
    },
    getMenuLeft(state) {
      return state.menuLeft;
    },
    getMenuRight(state) {
      return state.menuRight;
    },

    // border style, width & color / start
    getBorderStyle(state) {
      return state.borderStyle;
    },
    getBorderWidth(state) {
      return state.borderWidth;
    },
    getBorderColor(state) {
      return state.borderColor;
    },
    // border style, width & color / end

    // border radius / start
    getBorderRadiusGlobal(state) {
      return state.borderRadiusGlobal;
    },
    getBorderRadiusTopLeft(state) {
      return state.borderRadiusTopLeft;
    },
    getBorderRadiusTopRight(state) {
      return state.borderRadiusTopRight;
    },
    getBorderRadiusBottomleft(state) {
      return state.borderRadiusBottomleft;
    },
    getBorderRadiusBottomRight(state) {
      return state.borderRadiusBottomRight;
    },
    // border radius / end
    // hyperlink / start
    getElementContainsHyperlink(state) {
      return state.elementContainsHyperlink;
    },
    getHyperlinkAbility(state) {
      return state.hyperlinkAbility;
    },
    getHyperlinkInput(state) {
      return state.hyperlinkInput;
    },
    getHyperlinkMessage(state) {
      return state.hyperlinkMessage;
    },
    getHyperlinkError(state) {
      return state.hyperlinkError;
    },
    getHyberlinkEnable(state) {
      return state.hyberlinkEnable;
    },
    getOpenHyperlinkInNewTab(state) {
      return state.openHyperlinkinkInNewTab;
    },
    // hyperlink / end
    getOpacity(state) {
      return state.opacity;
    },
    getBackgroundOpacity(state) {
      return state.backgroundOpacity;
    },
    getTextAreaVueModel(state) {
      return state.textAreaVueModel;
    },
    getNextSibling(state) {
      return state.nextSibling;
    },
    getParentElement(state) {
      return state.parentElement;
    },
    getRestoredElement(state) {
      return state.restoredElement;
    },
    getCurrentClasses(state) {
      return state.currentClasses;
    },
    getFontStyle(state) {
      return state.fontStyle;
    },
    getFontVerticalPadding(state) {
      return state.fontVerticalPadding;
    },
    getFontHorizontalPadding(state) {
      return state.fontHorizontalPadding;
    },
    getFontVerticalMargin(state) {
      return state.fontVerticalMargin;
    },
    getFontHorizontalMargin(state) {
      return state.fontHorizontalMargin;
    },
    getFontFamily(state) {
      return state.fontFamily;
    },
    getFontWeight(state) {
      return state.fontWeight;
    },
    getFontBase(state) {
      return state.fontBase;
    },
    getFontDesktop(state) {
      return state.fontDesktop;
    },
    getFontTablet(state) {
      return state.fontTablet;
    },
    getFontMobile(state) {
      return state.fontMobile;
    },
    getBackgroundColor(state) {
      return state.backgroundColor;
    },
    getTextColor(state) {
      return state.textColor;
    },
    getEnabledCustomColorBackground(state) {
      return state.enabledCustomColorBackground;
    },
    getEnabledCustomColorText(state) {
      return state.enabledCustomColorText;
    },
    getBackgroundColorCustom(state) {
      return state.backgroundColorCustom;
    },
    getTextColorCustom(state) {
      return state.textColorCustom;
    },
    getElement(state) {
      return state.element;
    },
    getComponent(state) {
      return state.component;
    },
    getComponents(state) {
      return state.components;
    },
    getHighlightedImage(state) {
      return state.highlightedImage;
    },

    //
    getBasePrimaryImage(state) {
      return state.basePrimaryImage;
    },
    getFetchedComponents(state) {
      return state.fetchedComponents;
    }
  },

  mutations: {
    setMenuPreview(state, payload) {
      state.menuPreview = payload;
    },
    setMenuLeft(state, payload) {
      state.menuLeft = payload;
    },
    setMenuRight(state, payload) {
      state.menuRight = payload;
    },
    // border style, width & color / start
    setBorderStyle(state, payload) {
      state.borderStyle = payload;
    },
    setBorderWidth(state, payload) {
      state.borderWidth = payload;
    },
    setBorderColor(state, payload) {
      state.borderColor = payload;
    },
    // border style, width & color / end

    // border radius / start
    setBorderRadiusGlobal(state, payload) {
      state.borderRadiusGlobal = payload;
    },
    setBorderRadiusTopLeft(state, payload) {
      state.borderRadiusTopLeft = payload;
    },
    setBorderRadiusTopRight(state, payload) {
      state.borderRadiusTopRight = payload;
    },
    setBorderRadiusBottomleft(state, payload) {
      state.borderRadiusBottomleft = payload;
    },
    setBorderRadiusBottomRight(state, payload) {
      state.borderRadiusBottomRight = payload;
    },
    // hyperlink / start
    setElementContainsHyperlink(state, payload) {
      state.elementContainsHyperlink = payload;
    },
    setHyperlinkAbility(state, payload) {
      state.hyperlinkAbility = payload;
    },
    setHyperlinkInput(state, payload) {
      state.hyperlinkInput = payload;
    },
    setHyperlinkMessage(state, payload) {
      state.hyperlinkMessage = payload;
    },
    setHyperlinkError(state, payload) {
      state.hyperlinkError = payload;
    },
    setHyberlinkEnable(state, payload) {
      state.hyberlinkEnable = payload;
    },
    setOpenHyperlinkInNewTab(state, payload) {
      state.openHyperlinkinkInNewTab = payload;
    },
    // hyperlink / end
    setOpacity(state, payload) {
      state.opacity = payload;
    },
    setBackgroundOpacity(state, payload) {
      state.backgroundOpacity = payload;
    },
    setTextAreaVueModel(state, payload) {
      state.textAreaVueModel = payload;
    },
    setNextSibling(state, payload) {
      state.nextSibling = payload;
    },
    setParentElement(state, payload) {
      state.parentElement = payload;
    },
    setRestoredElement(state, payload) {
      state.restoredElement = payload;
    },
    setClass(state, payload) {
      state.currentClasses = [...state.currentClasses, payload];
    },
    removeClass(state, payload) {
      state.currentClasses = state.currentClasses.filter((cls: any) => cls !== payload);
    },
    setCurrentClasses(state, payload) {
      state.currentClasses = Array.from(payload);
    },
    setFontVerticalPadding(state, payload) {
      state.fontVerticalPadding = payload;
    },
    setFontHorizontalPadding(state, payload) {
      state.fontHorizontalPadding = payload;
    },
    setFontVerticalMargin(state, payload) {
      state.fontVerticalMargin = payload;
    },
    setFontHorizontalMargin(state, payload) {
      state.fontHorizontalMargin = payload;
    },
    setFontStyle(state, payload) {
      state.fontStyle = payload;
    },
    setFontFamily(state, payload) {
      state.fontFamily = payload;
    },
    setFontWeight(state, payload) {
      state.fontWeight = payload;
    },
    setFontBase(state, payload) {
      state.fontBase = payload;
    },
    setFontDesktop(state, payload) {
      state.fontDesktop = payload;
    },
    setFontTablet(state, payload) {
      state.fontTablet = payload;
    },
    setFontMobile(state, payload) {
      state.fontMobile = payload;
    },
    setBackgroundColor(state, payload) {
      state.backgroundColor = payload;
    },
    setTextColor(state, payload) {
      state.textColor = payload;
    },
    setBackgroundColorCustom(state, payload) {
      state.backgroundColorCustom = payload;
    },
    setTextColorCustom(state, payload) {
      state.textColorCustom = payload;
    },
    setEnabledCustomColorBackground(state, payload) {
      state.enabledCustomColorBackground = payload;
    },
    setEnabledCustomColorText(state, payload) {
      state.enabledCustomColorText = payload;
    },
    setElement(state, payload) {
      state.element = {};
      state.element = payload;
    },
    setComponent(state, payload) {
      state.component = {};
      state.component = payload;
    },
    setComponents(state, payload) {
      state.components = {} as any[];
      state.components = payload;
    },

    setHighlightedImage(state, payload) {
      state.highlightedImage = payload;
    },

    setBasePrimaryImage(state, payload) {
      state.element.src = payload;
      state.basePrimaryImage = payload;
    },
    setCurrentLayoutPreview(state, payload) {
      localStorage.setItem('preview', payload);
    },
    setFetchedComponents(state, payload) {
      state.fetchedComponents = payload;
    }
  },

  // actions
  actions: {
    // load products
    loadComponents(context, payload) {
      handlegetElements(
        'http://localhost:3003/components.json',
        {},
        {
          additionalCallTime: 300,
          abortTimeoutTime: 8000
        }
      );

      // context & send to mutation
      context.commit('setFetchedComponents', {
        fetchedData: fetchedComponents,
        isError: isErrorComponents,
        error: errorComponents,
        errors: errorsComponents,
        isLoading: isLoadingComponents,
        isSuccess: isSuccessComponents
      });
    }
  }
};

export default designerStore;

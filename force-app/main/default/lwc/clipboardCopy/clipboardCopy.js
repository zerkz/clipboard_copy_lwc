import { LightningElement, api } from 'lwc';
/**
 * A LWC Component that copies content to the clipboard. Component can be shown
 */
export default class ClipboardCopy extends LightningElement {
    //default values
    
    //general
    _type = 'icon'; // if not icon, defaults to lightning button
    _iconName = 'utility:copy_to_clipboard';
    _content = 'test content';
    _variant = 'base';
    _cssClass = '';
    _title = 'Copy To Clipboard';
    _styleOverride = '';

    //lightning-button-icon attributes    
    _iconSize = 'medium';

    //lightning button attributes
    _label = 'Copy To Clipboard';
    _iconPosition = 'left'
    _stretch = false;

    //event listener functions
    copyToClipboard() {
       let textArea = this.refs.clipboardTextArea;
       console.log(textArea.dataset.name);
       textArea.select();
       document.execCommand('copy');
       if (window.getSelection) {
        window.getSelection().removeAllRanges();
       } else if (document.selection) {
        document.selection.empty();
       }
    }

    get isIconButton() {
        return this._type === 'icon';
    }

    @api
    set styleOverride(value) {
        this._styleOverride = value;
    }

    get styleOverride() {
        return this._styleOverride;
    }


    @api
    set iconName(value) {
        this._iconName = value;
    }

    get iconName() {
        return this._iconName;
    }

    @api
    set iconSize(value) {
        this._iconSize = value;
    }

    get iconSize() {
        return this._iconSize;
    }

    @api
    set variant(value) {
        this._variant = value;
    }

    get variant() {
        return this._variant;
    }

    @api
    set cssClass(value) {    
        this._cssClass = value;
    }

    get cssClass() {
        return this._cssClass;
    }

    @api 
    set content(value) {
        this._content = value;
    }

    get content() {
        return this._content;
    }

    @api 
    set label(value) {
        this._label = value;
    }

    get label() {
        return this._label;
    }

    @api
    set title(value) {
        this._title = value;
    }

    get title() {
        return this._title;
    }





}
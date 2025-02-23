export class CommonLocators {
    _loading = "#loading"
    _spinner = ".bp3-spinner"
    _queryName = ".t--action-name-edit-field span"
    _queryNameTxt = ".t--action-name-edit-field input"
    _dsName = ".t--edit-datasource-name span"
    _dsNameTxt = ".t--edit-datasource-name input"
    _saveStatusSuccess = ".t--save-status-success"
    _codeMirrorTextArea = ".CodeMirror textarea"
    _codeMirrorCode = ".CodeMirror-code"
    _codeEditorTargetTextArea = ".CodeEditorTarget textarea"
    _codeEditorTarget = "div.CodeEditorTarget"
    _entityExplorersearch = "#entity-explorer-search"
    _propertyControl = ".t--property-control-"
    _textWidget = ".t--draggable-textwidget span"
    _inputWidget = ".t--draggable-inputwidgetv2 input"
    _publishButton = ".t--application-publish-btn"
    _widgetInCanvas = (widgetType: string) => `.t--draggable-${widgetType}`
    _widgetInDeployed = (widgetType: string) => `.t--widget-${widgetType}`
    _textWidgetInDeployed = this._widgetInDeployed("textwidget") + " span"
    _inputWidgetInDeployed = this._widgetInDeployed("inputwidgetv2") + " input"
    _imageWidget = ".t--draggable-imagewidget"
    _backToEditor = ".t--back-to-editor"
    _newPage = ".pages .t--entity-add-btn"
    _toastMsg = ".t--toast-action"
    _empty = "span[name='no-response']"
    _contextMenuInPane = "span[name='context-menu']"
    _visibleTextDiv = (divText: string) => "//div[text()='" + divText + "']"
    _openWidget = ".widgets .t--entity-add-btn"
    _dropHere = "#comment-overlay-wrapper-0"
    _activeTab = "span:contains('Active')"
    _crossBtn = "span.cancel-icon"
    _createNew = ".t--entity-add-btn.group.files"
    _uploadFiles = "div.uppy-Dashboard-AddFiles input"
    _uploadBtn = "button.uppy-StatusBar-actionBtn--upload"
    _debuggerIcon = ".t--debugger svg"
    _errorTab = "[data-cy=t--tab-ERROR]"
    _debugErrorMsg = ".t--debugger-message"
    _debuggerLabel = "span.debugger-label"
    _entityNameInExplorer = (entityNameinLeftSidebar: string) => "//div[contains(@class, 't--entity-name')][text()='" + entityNameinLeftSidebar + "']"
    _expandCollapseArrow = (entityNameinLeftSidebar: string) => "//div[text()='" + entityNameinLeftSidebar + "']/ancestor::div/preceding-sibling::a[contains(@class, 't--entity-collapse-toggle')]"
    _entityProperties = (entityNameinLeftSidebar: string) => "//div[text()='" + entityNameinLeftSidebar + "']/ancestor::div[contains(@class, 't--entity-item')]/following-sibling::div//div[contains(@class, 't--entity-property')]//code"
    _contextMenu = (entityNameinLeftSidebar: string) => "//div[text()='" + entityNameinLeftSidebar + "']/ancestor::div[1]/following-sibling::div//div[contains(@class, 'entity-context-menu-icon')]"
    _contextMenuItem = (item: string) => "//div[text()='" + item + "']/ancestor::a[contains(@class, 'single-select')]"
    _entityNameEditing = (entityNameinLeftSidebar: string) => "//span[text()='" + entityNameinLeftSidebar + "']/parent::div[contains(@class, 't--entity-name editing')]/input"
    _jsToggle = (controlToToggle: string) => ".t--property-control-" + controlToToggle + " .t--js-toggle"
    _spanButton = (btnVisibleText: string) => "//span[text()='" + btnVisibleText + "']/parent::button"
    _selectPropDropdown = (ddName: string) => "//div[contains(@class, 't--property-control-" + ddName + "')]//button[contains(@class, 't--open-dropdown-Select-Action')]"
    _dropDownValue = (ddOption: string) => ".single-select:contains('" + ddOption + "')"
    _selectOptionValue = (ddOption: string) => ".menu-item-link:contains('" + ddOption + "')"
    _selectedDropdownValue = "//button[contains(@class, 'select-button')]/span[@class='bp3-button-text']"
    _actionTextArea = (actionName: string) => "//label[text()='" + actionName + "']/following-sibling::div//div[contains(@class, 'CodeMirror')]//textarea"
    _existingDefaultTextInput = ".t--property-control-defaulttext .CodeMirror-code"
    _widgetPageIcon = (widgetType: string) => `.t--widget-card-draggable-${widgetType}`
    _propertyToggle = (controlToToggle: string) => ".t--property-control-" + controlToToggle + " input[type='checkbox']"
    _propertyToggleValue = (controlToToggle: string) => "//div[contains(@class, 't--property-control-" + controlToToggle + "')]//input[@type='checkbox']/parent::label"
    _openNavigationTab = (tabToOpen: string) => `#switcher--${tabToOpen}`
    _selectWidgetDropdown = (widgetType: string) => `//div[contains(@class, 't--draggable-${widgetType}')]//button`
    _selectWidgetDropdownInDeployed = (widgetType: string) => `//div[contains(@class, 't--widget-${widgetType}')]//button`
    _inputFieldByName = (fieldName: string) => "//p[text()='" + fieldName + "']/parent::label/following-sibling::div"
    _existingFieldTextByName = (fieldName: string) => "//label[text()='" + fieldName + "']/ancestor::div[contains(@class, 't--property-control-" + fieldName.replace(/ +/g, "").toLowerCase() + "')]"
    _existingFieldValueByName = (fieldName: string) => this._existingFieldTextByName(fieldName) + "//div[contains(@class,'CodeMirror-code')]"
    _evaluatedCurrentValue = "div:last-of-type .t--CodeEditor-evaluatedValue > div:last-of-type pre"

}

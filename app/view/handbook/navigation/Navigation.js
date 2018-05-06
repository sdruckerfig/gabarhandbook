/*
 * File: app/view/handbook/navigation/Navigation.js
 *
 * This file was generated by Sencha Architect version 4.2.3.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 6.2.x Classic library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 6.2.x Classic. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.handbook.navigation.Navigation', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.navigation',

    requires: [
        'MyApp.view.handbook.navigation.NavigationViewModel',
        'MyApp.view.handbook.navigation.NavigationViewController',
        'MyApp.view.handbook.navigation.Buttonbar',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Text',
        'Ext.button.Button',
        'Ext.tree.View',
        'Ext.panel.Tool',
        'Ext.panel.Panel'
    ],

    controller: 'handbooktreenav',
    viewModel: {
        type: 'handbook.navigation.navigation'
    },
    reference: 'mytree',
    flex: 2,
    collapsible: false,
    title: 'Table of Contents',
    rootVisible: false,

    bind: {
        selection: '{selectedNode}',
        store: '{TableOfContents}'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'textfield',
                    reference: 'searchfield',
                    cls: 'searchfield',
                    flex: 1,
                    margin: '0 5 0 0',
                    style: {
                        'border-radius': '5px'
                    },
                    fieldLabel: '',
                    labelAlign: 'top',
                    emptyText: 'Search',
                    bind: {
                        value: '{searchText}'
                    },
                    listeners: {
                        change: {
                            fn: 'onSearchFieldChange',
                            buffer: 450
                        },
                        specialkey: 'onTextfieldSpecialkey'
                    }
                },
                {
                    xtype: 'button',
                    handler: 'onSearch',
                    text: 'Search'
                },
                {
                    xtype: 'button',
                    handler: 'onClearSearch',
                    text: 'Clear'
                }
            ]
        },
        {
            xtype: 'navigationbuttonbar',
            dock: 'bottom'
        }
    ],
    tools: [
        {
            xtype: 'tool',
            callback: 'onExpandAll',
            tooltip: 'Expand All',
            type: 'expand'
        },
        {
            xtype: 'tool',
            callback: 'onCollapseAll',
            tooltip: 'Collapse All',
            type: 'collapse'
        },
        {
            xtype: 'tool',
            hidden: true,
            tooltip: 'Help',
            type: 'help'
        },
        {
            xtype: 'tool',
            callback: 'onMaximize',
            tooltip: 'Toggle full screen view',
            type: 'maximize'
        }
    ],
    listeners: {
        checkchange: 'onTreepanelCheckChange',
        select: 'onTreepanelSelect',
        itemdblclick: 'onTreepanelItemDblClick'
    }

});
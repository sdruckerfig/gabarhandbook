/*
 * File: app/view/MyViewportViewController.js
 *
 * This file was generated by Sencha Architect version 4.2.2.
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

Ext.define('MyApp.view.MyViewportViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.myviewport',

    requires: [
        'Ext.app.route.Route'
    ],

    routes: {
        'handbook/:id': 'onGoToNode'
    },

    control: {
        "navigationbuttonbar": {
            gotoprevious: 'onGoToPrevious',
            gotonext: 'onGoToNext'
        },
        "navigation": {
            onmultiselectchange: 'onChapterSelect'
        },
        "navigationheader": {
            textsearchchange: 'onTextSearchChange'
        }
    },

    onGoToPrevious: function(buttonbar, button) {
        var nextNode = this.getViewModel().get('prevNode');
        if (nextNode) {
           this.redirectTo('handbook/' + nextNode.id);
        }
    },

    onGoToNext: function(buttonbar, button) {
        var nextNode = this.getViewModel().get('nextNode');
        if (nextNode) {
            this.redirectTo('handbook/' + nextNode.id);
        }
    },

    onChapterSelect: function(target, nodes) {
        var vm = this.getViewModel();
        var s = vm.get('TableOfContents');

        var data = [];

        for (var i=0; i<nodes.length; i++) {

            var children = this.getAllChildNodes(nodes[i]);

            if (!Ext.isArray(children)) {
                children = [children];
            }

            for (var j=0; j<children.length; j++) {
                var found = false;
                for (var k=0; k<data.length; k++) {
                    if (data[k].id == children[j].id) {
                        found = true;
                        break;
                    }
                }
                if (!found && s.isVisible(children[j])) {
                    data.push({
                        title: children[j].get('text'),
                        content: children[j].get('content'),
                        depth: children[j].get('depth'),
                        id: children[j].id
                    });
                }
            }

        }
        this.lookup('contentPnl').setData(data);
        this.highlightTerms();
    },

    onTextSearchChange: function(target, searchterm, searchfield) {
        var store = this.getViewModel().get('TableOfContents');
        this.getViewModel().set('searchText',searchterm);
        store.clearFilter();
        if (!Ext.isEmpty(searchterm)) {
            var regExp = new RegExp(searchterm,'gi');
            store.filterBy(function(rec) {
               var content =  rec.get('text') + ' ' + rec.get('content');
               if (regExp.exec(content)) {
                   return true;
               } else {
                   return false;
               }
            });
        }


        // find first matching id
        if (store.getCount() > 0) {
          var node = store.getAt(0);
          this.redirectTo('handbook/' + node.get('id'));
        }

        var contentPnl = this.lookup('contentPnl');
        var data = contentPnl.getData(data);
        contentPnl.setData(data);
        this.highlightTerms();

    },

    highlightTerms: function() {
        var searchValue= this.getViewModel().get('searchText');
        if (!Ext.isEmpty(searchValue)) {
        var matchCls = 'x-livesearch-match';
        var regExpProtect = /\\|\/|\+|\\|\.|\[|\]|\{|\}|\?|\$|\*|\^|\|/gm;
        var tagsRe= /<[^>]*>/gm;
        var tagsProtect= '\x0f';

        var searchRegExp = new RegExp(searchValue, 'gi');
        var indexes = [];
        var count = 0;
        var currentIndex = 0;
        var cell = this.lookup('contentPnl').getEl().down('.x-autocontainer-innerCt');


        var matches = cell.dom.innerHTML.match(tagsRe);
        var cellHTML = cell.dom.innerHTML.replace(tagsRe,tagsProtect);

        // populate indexes array, set currentIndex, and replace wrap matched string in a span
        cellHTML = cellHTML.replace(searchRegExp, function(m) {
            count += 1;
            /*
            if (Ext.Array.indexOf(indexes, idx) === -1) {
                indexes.push(idx);
            }
            if (currentIndex === null) {
                currentIndex = idx;
            }
            */
            return '<span class="' + matchCls + '">' + m + '</span>';
        });
        // restore protected tags
        Ext.each(matches, function(match) {
            cellHTML = cellHTML.replace(tagsProtect, match);
        });
        // update cell html
        cell.dom.innerHTML = cellHTML;

        }


    },

    onGoToNode: function(id) {
        var vm = this.getViewModel();
        var tree = this.lookup('navigation');
        var checkedNodes = tree.getChecked();
        var ts = vm.get('TableOfContents');

        if (!ts || ts.getCount() < 3) {
            Ext.defer(this.onGoToNode,250,this,[id]);
            return;
        }
        var record = ts.findNode('id',id);
        vm.set('selectedNode',record);

        tree.getView().focusRow(record);

        if (checkedNodes.length == 0) {
            var nodes = this.getAllChildNodes(record);
            if (Ext.isArray(nodes)) {

                var data = [];
                for (var i=0; i<nodes.length; i++) {
                  data.push({
                      title: nodes[i].get('text'),
                      content: nodes[i].get('content'),
                      depth: nodes[i].get('depth')
                  });
                }
                this.lookup('contentPnl').setData(data);

            } else {
                this.lookup('contentPnl').setData([{
                    title: record.get('text'),
                    content: record.get('content'),
                    depth: record.get('depth')
                }]);
            }
            this.highlightTerms();
        }


        vm.set('nextNode',this.getNextNode(record));
        vm.set('prevNode',this.getPrevNode(record));
    },

    getAllChildNodes: function(node) {
        var me = this;
        var allNodes = new Array();
        if (node == null) {
            return [];
        }

        if(!node.hasChildNodes()){
            return node;
        }else{
            allNodes.push(node);
            node.eachChild(function(Mynode){allNodes = allNodes.concat(me.getAllChildNodes(Mynode));});
        }
        return allNodes;
    },

    getNextParentSibling: function(node) {
        if (node.nextSibling) {
          return node.nextSibling;
        } else if (node.parentNode) {
          return this.getNextParentSibling(node.parentNode);
        } else {
          return null;
        }

    },

    getNextNode: function(node) {
        var vm = this.getViewModel();
        var s = vm.get('TableOfContents');

        var nextNode = null;
        if (node.childNodes.length > 0) {
            nextNode = node.childNodes[0];
        } else if (node.nextSibling) {
            nextNode = node.nextSibling;
        } else {
            nextNode = this.getNextParentSibling(node.parentNode);
        }

        if (nextNode) {
            if (!s.isVisible(nextNode)) {
               nextNode = this.getNextNode(nextNode);
            }
        }


        return nextNode;
    },

    getPrevNode: function(node) {
        var vm = this.getViewModel();
        var s = vm.get('TableOfContents');
        var prevNode = null;
        if (node.previousSibling) {
            if (node.previousSibling.childNodes.length > 0) {
                prevNode = this.getLastChildNode(node.previousSibling);
            } else {
                prevNode = node.previousSibling;
            }
        } else if (node.parentNode){
           prevNode = node.parentNode;
        }

        if (prevNode.id == 'root') {
          return null;
        } else {
          if (s.isVisible(prevNode)) {
              return prevNode;
          } else {
              return this.getPrevNode(prevNode);
          }
        }

    },

    getLastChildNode: function(node) {
        if (!node.lastChild) {
            return node;
        } else {
            return this.getLastChildNode(node.lastChild);
        }
    },

    onViewportAfterRender: function(component, eOpts) {

    },

    onTreeStoreBeforeLoad: function(store, operation, eOpts) {
        this.getView().setLoading(true);
    },

    onTreeStoreLoad: function(treestore, records, successful, operation, node, eOpts) {

        Ext.Ajax.request({
            url: 'https://dev.gabar.org/handbook/components/HandbookRuleVersion.cfc?method=get',
            success: function(req,res) {
                var versions = Ext.decode(req.responseText);
                var root = treestore.getRoot();
                for (var i=0; i<versions.length; i++) {
                    var node = root.findChild('id','rule' + versions[i].parentId , true);

                    if (node) {
                        if (!node.get('versions')) {
                            node.set('versions',[]);
                        }
                        var nodeVersions = node.get('versions');
                        nodeVersions.push({
                            "text" : versions[i].name,
                            "versionNumber" : versions[i].version,
                            "content" : versions[i].bodyText
                        });
                        node.set('versions',nodeVersions);
                    }
                }
                this.getView().setLoading(false);

            },
            failure: function(req,res) {
                Ext.Msg.alert("Error","Could not get rule versions. Please try again later.");
            },
            scope: this
        });

    }

});

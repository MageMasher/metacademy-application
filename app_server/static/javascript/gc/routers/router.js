window.define(["jquery", "backbone", "gc/views/graph-editor-view", "gc/models/editable-graph-model", "gc/views/concept-editor-view"], function($, Backbone, GraphEditorView, GraphEditorModel, ConceptEditorView){
  return Backbone.Router.extend({
    routes: {
      "": "showGCEditor",
      ":nodeid": "openEditorView"
    },

    // function to handle non-ge-view switching
    showView: function(view){
      var thisRoute = this;

      // remove/hide old views safely      
      thisRoute.removeOtherView();
      if (thisRoute.geView){
        thisRoute.geView.$el.hide();
      }

      // set/show given view
      thisRoute.currentView = view;
      thisRoute.currentView.render();
      var $wrapEl = $("#concept-editor-wrap");
      $wrapEl.append(thisRoute.currentView.el);
      $wrapEl.show();
      thisRoute.currentView.$el.show();
    },

    removeOtherView: function(){
      var thisRoute = this;
      if (thisRoute.currentView){
        thisRoute.currentView.$el.parent().hide();
        thisRoute.currentView.remove(); // must implement remove function
      }
      thisRoute.currentView = null;
    },
    
    showGCEditor: function(){
      // feed graph creator into the appropriate view
      var thisRoute = this;
      thisRoute.geModel = thisRoute.geModel || new GraphEditorModel();
      thisRoute.geView = new GraphEditorView({model: thisRoute.geModel});
      thisRoute.geView.render();
      thisRoute.removeOtherView();
      thisRoute.geView.$el.show();
    },

    openEditorView: function(concept_id){
      var thisRoute = this;      
      thisRoute.geModel = thisRoute.geModel || new GraphEditorModel();
      var model = thisRoute.geModel.get("nodes").get(concept_id);
      if (model){
        var editorView = new ConceptEditorView({model: model});
        thisRoute.showView(editorView);
      }
    }

  });
});
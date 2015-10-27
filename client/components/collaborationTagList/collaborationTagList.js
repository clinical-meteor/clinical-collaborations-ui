

Template.collaborationTagList.helpers({
  collaboration: function() {
    if ('collaboration' in this)
      return this.collaboration;
    var cs = Session.get("collaborationName");
    if (cs && cs.length > 0)
      return [cs];
    return [];
  },
  collaborationLink: function(){
    var col = Collaborations.findOne({name: String(this)});
    if (col == null) return "";
    return "/collaboration/"+col.name;
  },
  collaborationName: function(){
    return this;
  }
});


Template.collaborationTagList.events({
  'click .addCollaborators': function(e, t) {
      var _id = this._id;
      var data = this.collaboration.map(function(f) { return {id:f, text:f}});
      var ppp =  Blaze.toHTMLWithData(Template.addCollaboratorsDialog, this);
      $(event.target).append(ppp);
      $(document).ready(function() {
          var $sc = $(event.target).find('.selectCollaborators');
          console.log("click addCol data", data, _id, $sc);
          $sc.select2({tags: Collaboration.getNames(), width:"600px"});
          /*

          for some reason, this messages things up.
          so hold off for now
          */
          setTimeout(function() {
              $sc.select2( "data", data);
          }, 200);
          $('body').append('<div onclick="doneEditOrAddCollaborators()" class="cover"></div>');
      });
  },

  'submit #addCollaboratorsForm' : function(e, t) {
      e.preventDefault();
      return;
  },

  'click  #addCollaboratorsDone':function(event, template) {
      event.preventDefault();
      var $sc = $(event.target).parent().find('input[class="selectCollaborators"]');
      var newCollabs = $sc.select2("data").map(function(f){ return f.id});
      var _id = $(event.target).data("_id");
      console.log("YYY", newCollabs, _id);
      Posts.update({_id:_id}, { $set: {collaboration: newCollabs}});
      doneEditOrAddCollaborators();
   }
});

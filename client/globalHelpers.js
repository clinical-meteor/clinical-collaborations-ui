Session.setDefault('collaborationSearchFilter', "");


Template.registerHelper("isCollaborationMember", function (collaborationId) {
  if (collaborationId) {
    return isCollaborationMember(collaborationId);
  } else {
    return isCollaborationMember(this._id);
  }
});
Template.registerHelper("isCollaborationAdmin", function (collaborationId) {
  if (collaborationId) {
    return isCollaborationAdmin(collaborationId);
  } else {
    return isCollaborationAdmin(this._id);
  }
});
Template.registerHelper("isCollaborator", function (collaborationId) {
  if (collaborationId) {
    return isCollaborator(collaborationId);
  } else {
    return isCollaborator(this._id);
  }
});
Template.registerHelper("isCollaborator", function (collaborationId) {
  if (collaborationId) {
    return memberBecause(collaborationId);
  } else {
    return memberBecause(this._id);
  }
});


function memberBecause (collaborationId) {
  var col = Collaborations.findOne({
    _id: collaborationId
  });
  if (col == null) return false;
  var direct = _.intersection(getEmails(), col.collaborators);
  var indirect = _.intersection(Meteor.user().profile.collaborations, col.collaborators);
  console.log(col.name, "direct", direct, "indirect", indirect);

  if ((direct.length === 0) && (indirect.length > 0)) {
    return indirect;
  } else {
    return null;
  }
}

function isCollaborationMember (id) {
  var col = Collaborations.findOne({
    _id: id
  });
  if (col == null) return false;

  var user = Meteor.user();
  if (user) {
    if (user.profile && user.profile.collaborations) {
      return user.profile.collaborations.indexOf(col.name) >= 0;
    } else {
      return false;
    }
  } else {
    return false;
  }

}

function isCollaborationAdmin (collaborationId) {
  //process.env.DEBUG && console.log('isCollaborationAdmin', collaborationId);

  var collaboration = Collaborations.findOne({
    _id: collaborationId
  });

  if (collaboration === null){
    return false;
  }

  // var admins = collaboration.administrators;
  // if (admins == null) return true;
  if (collaboration.administrators === null) {
    return true;
  }
  if (Meteor.user()) {
    var emails = Meteor.user().getEmails();
    process.env.DEBUG && console.log('emails', emails);

    if (emails && collaboration.administrators) {
      return _.intersection(collaboration.administrators, emails).length > 0;
    };
  } else {
    return false;
  }
}

function isCollaborator (id) {
  var col = Collaborations.findOne({
    _id: id
  });
  if (col == null) return false;
  var ad = col.administrators;
  if (ad == null) return true;
  var em = getEmails();

  for (var i = 0; i < em.length; i++){
    if (ad.indexOf(em[i]) >= 0){
      return true;
    }
  }
  return false;
}

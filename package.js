
Package.describe({
  name: 'clinical:collaborations-ui',
  version: '2.1.21',
  summary: 'UI components for the clinical:collaborations package.',
  git: 'https://github.com/clinical-meteor/clinical-collaborations-ui',
  documentation: 'README.md'
});


Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');
  api.use([
    'meteor-platform@1.2.2',
    'http@1.1.0',
    'grove:less@0.1.1',
    'jquery@1.11.3_2',
    'underscore@1.0.3',
    'clinical:collaborations@2.2.1',
    'templating@1.1.1',
    'aldeed:template-extension@3.4.3',
    'cfs:http-methods@0.0.29',
    'aldeed:http@0.2.2',
    'clinical:router@2.0.13',
    'pfafman:font-awesome-4@4.2.0_4',
    'clinical:glass-ui@1.3.1'
  ]);


  api.addFiles([
    'client/routes.js',
    'client/globalHelpers.js',

    'client/components/collaboration_item.css',
    'client/components/post_collaboration.css',

    'client/components/addCollaboratorsDialog/addCollaboratorsDialog.less',
    'client/components/addCollaboratorsDialog/addCollaboratorsDialog.html',
    'client/components/addCollaboratorsDialog/addCollaboratorsDialog.js',

    // 'client/components/collaborationAdd/collaborationAdd.less',
    // 'client/components/collaborationAdd/collaborationAdd.html',
    // 'client/components/collaborationAdd/collaborationAdd.js',

    'client/components/collaborationEdit/collaborationEdit.less',
    'client/components/collaborationEdit/collaborationEdit.html',
    'client/components/collaborationEdit/collaborationEdit.js',

    'client/components/upsertCollaborationForm/upsertCollaborationForm.less',
    'client/components/upsertCollaborationForm/upsertCollaborationForm.html',
    'client/components/upsertCollaborationForm/upsertCollaborationForm.js',

    'client/components/collaborationGrid/collaborationGrid.less',
    'client/components/collaborationGrid/collaborationGrid.html',
    'client/components/collaborationGrid/collaborationGrid.js',

    'client/components/collaborationMenu/collaborationMenu.less',
    'client/components/collaborationMenu/collaborationMenu.html',
    'client/components/collaborationMenu/collaborationMenu.js',

    'client/components/collaborationReview/collaborationReview.less',
    'client/components/collaborationReview/collaborationReview.html',
    'client/components/collaborationReview/collaborationReview.js',

    'client/components/collaborationTagList/collaborationTagList.less',
    'client/components/collaborationTagList/collaborationTagList.html',
    'client/components/collaborationTagList/collaborationTagList.js',

    'client/components/collaborationPicklistModal/collaborationPicklistModal.less',
    'client/components/collaborationPicklistModal/collaborationPicklistModal.html',
    'client/components/collaborationPicklistModal/collaborationPicklistModal.js',

    'client/components/selectCollaborators/selectCollaborators.less',
    'client/components/selectCollaborators/selectCollaborators.html',
    'client/components/selectCollaborators/selectCollaborators.js',

    'client/components/collaborationActionButtons/collaborationActionButtons.less',
    'client/components/collaborationActionButtons/collaborationActionButtons.html',
    'client/components/collaborationActionButtons/collaborationActionButtons.js'

  ], ['client']);

  api.addFiles([
    'server/http.js',
  ], 'server');

  // api.imply('clinical:user-model');

  api.export('collaborationPicklistModal');
});

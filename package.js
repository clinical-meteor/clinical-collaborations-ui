
Package.describe({
  name: 'clinical:collaborations-ui',
  version: '1.0.0',
  summary: 'UI components for the ``clinical:collaborations`` package.',
  git: 'https://github.com/UCSC-MedBook/MedBook-Telescope/tree/master/packages/clinical-collaborations-ui',
  documentation: 'README.md'
});


Package.onUse(function (api) {

  api.use([
    'http',
    'less',
    'jquery',
    'underscore',
    'clinical:collaborations',
    'templating',
    'aldeed:template-extension',
    'cfs:http-methods',
    'aldeed:http',
    'iron:router',
    'pfafman:font-awesome-4'
  ], 'client');


  api.addFiles([
    'client/routes.js',
    'client/autoform.js',

    'client/components/collaboration_item.js',
    'client/components/post_collaborations.js',

    'client/components/addCollaboratorsDialog/addCollaboratorsDialog.less',
    'client/components/addCollaboratorsDialog/addCollaboratorsDialog.html',
    'client/components/addCollaboratorsDialog/addCollaboratorsDialog.js',

    'client/components/collaborationAdd/collaborationAdd.less',
    'client/components/collaborationAdd/collaborationAdd.html',
    'client/components/collaborationAdd/collaborationAdd.js',

    'client/components/collaborationEdit/collaborationEdit.less',
    'client/components/collaborationEdit/collaborationEdit.html',
    'client/components/collaborationEdit/collaborationEdit.js',

    'client/components/collaborationForm/collaborationForm.less',
    'client/components/collaborationForm/collaborationForm.html',
    'client/components/collaborationForm/collaborationForm.js',

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

    'client/components/selectCollaborators/selectCollaborators.less',
    'client/components/selectCollaborators/selectCollaborators.html',
    'client/components/selectCollaborators/selectCollaborators.js'

  ], ['client']);

});

describe('fooTemplate', function(){
  it.client('should have customizable title', function(client){
    var card = Blaze.renderWithData(
        Template.foo,
        {title: "lorem ipsum...", description: "words, words, words..."},
        document.body
    );

    expect.element('.foo').to.be.visible;
    expect.element('.foo .title').text.to.contain('lorem ipsum');

    Blaze.remove(card);
  });
});

/** @jsx React.DOM */
define(function(require){

  var User = require('models/User');

  var Container = require('components/Container/View');
  var ItemList = require('components/ItemList/View');

  var ProfileCard = require('components/ProfileCard/View');
  var PageHeader = require('components/PageHeader/View');

  var Index = React.createClass({
    getInitialState: function () {
      return {
        users: {
          models: []
        }
      };
    },

    componentWillMount: function () {
      User.all(function(err, users){
        this.setState({users: users});
      }.bind(this));
    },

    render: function () {
      return (
        <div id='index-page'>
          <Container>
            <PageHeader title='People' description='People you should follow' icon='settings'/>

            <ItemList perRow='four' stackable={true}>

              {
                this.state.users.models.map(function(user){
                  return <ProfileCard username={user.username()} points={user.points()}/>
                })
              }

            </ItemList>

          </Container>
        </div>
      );
    }
  });

  return Index;
});
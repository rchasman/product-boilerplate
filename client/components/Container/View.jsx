/** @jsx React.DOM */
define(function(require){
  var Container = React.createClass({
    render: function() {
      return this.transferPropsTo(
        <div className='ui segment container'>
          {this.props.children}
        </div>
      );
    }
  });

  return Container;
});
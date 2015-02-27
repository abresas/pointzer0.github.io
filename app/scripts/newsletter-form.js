/**
 * @fileOverview The newsletter js for MailChimp
 */
'use strict';

(function() {
  var newsletter = {};
  // mailchimp code
  newsletter.mceInit = function() {
    var options = {
      url: 'https://check-connectivity.us2.list-manage.com/subscribe/post-json?u=249dbe460c3c1857a489dde05&amp;id=64bd176494&c=?',
      // url: 'https://check-connectivity.us2.list-manage.com/subscribe/post-json?u=249dbe460c3c1857a489dde05&amp;id=065210f8aa&c=?',
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8'

    };

    $('#mc_embed_signup form').submit(function(ev){
      $('.response').hide();
      ev.preventDefault();

      // form position
      var email = this.EMAIL.value;
      options.data = $(this).serialize();
      options.success = function(resp) {
        newsletter.mceSuccess(resp, email);
      };

      $.ajax(options);

      return false;
    });
  };

  newsletter.mceSuccess = function(resp) {
    if (resp.result === 'success'){
      // Show thank
      $('#mc_embed_signup').hide();
      $('.thankyou').removeClass('hide');
      return;
    }

    var index = -1;
    var msg;
    try {
      var parts = resp.msg.split(' - ',2);
      if (parts[1] === undefined){
        msg = resp.msg;
      } else {
        var i = parseInt(parts[0], 10);
        if (i.toString() === parts[0]){
          index = parts[0];
          msg = parts[1];
        } else {
          index = -1;
          msg = resp.msg;
        }
      }
    } catch(e) {
      index = -1;
      msg = resp.msg;
    }
    $('.js-error').show();
    $('.js-error').html(msg);
  };

  newsletter.mceInit();
})();

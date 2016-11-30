/**
 * Created by Ross on 11/28/2016.
 */
$('.confirmation').on('click', function() {
    return confirm('Are you sure you want to delete this?');
});

//Uses the JQuery validation plugin to make sure the passwords are the same
var validator = $('#registerForm').validate({
    rules: {
        confirm: {
            required: true,
            equalTo: '#password'
        }
    },
    messages: {
        confirm: {
            equalTo: 'Your passwords do not match'
        }
    }
});
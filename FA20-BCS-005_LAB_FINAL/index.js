$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:3000/roles',
        type: 'GET',
        success: function(response) {
            var roleList = $('#roleList');
            response.forEach(function(role) {
                roleList.append('<li>' + role.title + '</li>');
            });
        },
        error: function(xhr, status, error) {
            console.error('Error fetching roles:', error);
        }
    });
});


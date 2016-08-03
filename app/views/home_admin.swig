{% extends 'layout.swig' %}

{% block content %}
  <p><a href="/logout">Logout</a></p>
  <h1>{{ username }}</h1>
{% if isCreated %}
  <a href="/proyecto/{{id}}">Mi proyecto</a>
{% else %}
  <a href="/proyecto-new">Agregar un proyecto</a>
{% endif %}
  <script>
  $(document).ready(function() {
     $('#proyectos').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "/home_admin",
            "type": "POST",
	},
	"columns": [
	    {"data": "_id", "fnCreatedCell": function(nTd, sData, oData, iRow, iCol){
             	    $(nTd).html("<a href='/proyecto/"+oData._id+"'>"+oData._id+"</a>");
	        }
	    },
	    {"data": "nombre_del_proyecto"},
	    {"data": "eje_tematico"},
	    {"data": "resumen"}
	]
      });
  });
  </script>
{% endblock %}

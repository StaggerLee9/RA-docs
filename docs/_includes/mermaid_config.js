{
  "startOnLoad": true,
  "securityLevel": "loose"
  {% if site.mermaid.parameters %}
    {% for param in site.mermaid.parameters %}
      , "{{ param[0] }}": {{ param[1] | jsonify }}
    {% endfor %}
  {% endif %}
}

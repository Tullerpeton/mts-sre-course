---
- name: 'Setup Postgres Alertmanager'
  hosts: promt
  roles:
    - prometheus.prometheus.alertmanager
  vars:
    alertmanager_version: latest
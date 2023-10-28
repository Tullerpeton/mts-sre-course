---
- name: 'Setup Postgres Alertmanager'
  hosts: all
  roles:
    - prometheus.prometheus.alertmanager
  vars:
    alertmanager_version: latest
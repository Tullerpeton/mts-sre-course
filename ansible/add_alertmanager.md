---
- name: 'Setup Postgres Alertmanager'
  hosts: promt
  roles:
    - alertmanager
  vars:
    alertmanager_version: latest
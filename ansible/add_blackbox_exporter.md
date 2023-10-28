---
- hosts: promt
  become: true
  roles:
    - blackbox-exporter
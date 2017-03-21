# Adapted by Paul Glezen <pglezen@isab.lacounty.gov> from
#   https://github.com/CentOS/CentOS-Dockerfiles/tree/master/ssh/centos7
# for use in ISAB Regular Expression Workshop.
#
# "ported" by Adam Miller <maxamillion@fedoraproject.org> from
#   https://github.com/fedora-cloud/Fedora-Dockerfiles
#
# Originally written for Fedora-Dockerfiles by
#   scollier <scollier@redhat.com>

FROM centos:centos7
MAINTAINER Paul Glezen <pglezen@isab.lacounty.gov>

RUN yum -y update; yum clean all
RUN yum -y install openssh-server passwd; yum clean all
ADD ./start.sh /start.sh
RUN mkdir /var/run/sshd

RUN ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key -N '' 

RUN chmod 755 /start.sh
# EXPOSE 22
RUN ./start.sh

COPY samples /home/user/samples/
RUN chown -R user:user /home/user/samples
ENTRYPOINT ["/usr/sbin/sshd", "-D"]

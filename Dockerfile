FROM nginx

#----------------------------------------------
# nginx default setting
#----------------------------------------------
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/nginx-templates/default.conf.template /etc/nginx/templates/default.conf.template
COPY nginx/html/index.html /usr/share/nginx/html/index.html


#----------------------------------------------
# nginx dfpcen-dx-guide setting
#----------------------------------------------
COPY nginx/nginx-templates/guide.dfpcen.com.conf.template /etc/nginx/templates/guide.dfpcen.com.conf.template
COPY docs/.vitepress/dist /usr/share/nginx/html/guide.dfpcen.com

#----------------------------------------------
# nginx 52.78.194.133 setting
#----------------------------------------------
#COPY nginx/nginx-templates/52.78.194.133.conf.template /etc/nginx/templates/52.78.194.133.conf.template
#COPY docs/.vitepress/dist /usr/share/nginx/html/dx-guide.dfpcen.com


WORKDIR /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]
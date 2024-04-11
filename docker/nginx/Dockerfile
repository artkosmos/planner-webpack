FROM nginx

COPY --from=frontend-app /app/dist /usr/share/nginx/html
COPY --from=frontend-app /app/public/locales /usr/share/nginx/html/locales

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
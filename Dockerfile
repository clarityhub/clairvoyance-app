FROM postgres:9.6

ADD ./repos/services/service-analytics/db/init.sh /docker-entrypoint-initdb.d/service-analytics.sh
ADD ./repos/services/service-auth/db/init.sh /docker-entrypoint-initdb.d/service-auth.sh
ADD ./repos/services/service-billing/db/init.sh /docker-entrypoint-initdb.d/service-billing.sh
ADD ./repos/services/service-chat/db/init.sh /docker-entrypoint-initdb.d/service-chat.sh
ADD ./repos/services/service-email/db/init.sh /docker-entrypoint-initdb.d/service-email.sh
ADD ./repos/services/service-rtc/db/init.sh /docker-entrypoint-initdb.d/service-rtc.sh
ADD ./repos/services/service-suggestions/db/init.sh /docker-entrypoint-initdb.d/service-suggestions.sh
ADD ./repos/services/service-users/db/init.sh /docker-entrypoint-initdb.d/service-users.sh

ADD ./repos/services/integration-claire-bot/db/init.sh /docker-entrypoint-initdb.d/integration-claire-bot.sh
ADD ./repos/services/integration-website-chat/db/init.sh /docker-entrypoint-initdb.d/integration-website-chat.sh
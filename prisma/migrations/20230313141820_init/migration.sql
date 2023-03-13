-- CreateTable
CREATE TABLE "welcomes" (
    "guildId" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL,
    "welcomeEnabled" BOOLEAN NOT NULL,
    "welcomeChannelID" TEXT,
    "welcomeMessage" TEXT NOT NULL,
    "goodbyeEnabled" BOOLEAN NOT NULL,
    "goodbyeChannelID" TEXT,
    "goodbyeMessage" TEXT NOT NULL,

    CONSTRAINT "welcomes_pkey" PRIMARY KEY ("guildId")
);

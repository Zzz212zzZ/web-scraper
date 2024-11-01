/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Blog_url_key" ON "Blog"("url");

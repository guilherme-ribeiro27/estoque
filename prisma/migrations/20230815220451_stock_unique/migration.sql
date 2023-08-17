/*
  Warnings:

  - A unique constraint covering the columns `[productModelsId,size]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Stock_productModelsId_size_key" ON "Stock"("productModelsId", "size");

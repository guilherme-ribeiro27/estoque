-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "productModelsId" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_productModelsId_fkey" FOREIGN KEY ("productModelsId") REFERENCES "ProductModels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

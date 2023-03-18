-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "age" INTEGER,
    "dob" DATE,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);


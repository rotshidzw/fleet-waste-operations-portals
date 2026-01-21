-- CreateEnum
CREATE TYPE "WorkflowArea" AS ENUM ('HR_ONBOARDING', 'HR_PERFORMANCE', 'HR_LEAVE', 'HR_TRAINING', 'HR_POLICIES', 'ADMIN_ACCESS', 'ADMIN_SECURITY', 'ADMIN_BUDGET', 'ADMIN_VENDOR', 'ADMIN_COMMS');

-- CreateTable
CREATE TABLE "WorkflowItem" (
    "id" TEXT NOT NULL,
    "area" "WorkflowArea" NOT NULL,
    "title" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkflowItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WorkflowItem_area_idx" ON "WorkflowItem"("area");

-- CreateIndex
CREATE INDEX "WorkflowItem_status_idx" ON "WorkflowItem"("status");

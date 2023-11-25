BEGIN TRY

BEGIN TRAN;

-- CreateSchema
EXEC sp_executesql N'CREATE SCHEMA [energycons];';;

-- CreateSchema
EXEC sp_executesql N'CREATE SCHEMA [prodmon];';;

-- CreateTable
CREATE TABLE [prodmon].[arduino] (
    [nama_arduino] VARCHAR(255) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [assigned_transaction] INT,
    CONSTRAINT [arduino_nama_arduino_key] UNIQUE NONCLUSTERED ([nama_arduino])
);

-- CreateTable
CREATE TABLE [prodmon].[user] (
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [user_pkey] PRIMARY KEY CLUSTERED ([username]),
    CONSTRAINT [user_username_key] UNIQUE NONCLUSTERED ([username])
);

-- CreateTable
CREATE TABLE [prodmon].[transaction] (
    [id] INT NOT NULL IDENTITY(1,1),
    [id_model] INT NOT NULL,
    [id_group] INT NOT NULL,
    [plan] INT NOT NULL,
    [actual] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [transaction_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [assign_arduino] VARCHAR(255) NOT NULL,
    CONSTRAINT [transaction_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [prodmon].[scan_history] (
    [id] INT NOT NULL IDENTITY(1,1),
    [id_transaction] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [scan_history_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [scan_history_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [prodmon].[model] (
    [id] INT NOT NULL IDENTITY(1,1),
    [model_name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [model_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [model_model_name_key] UNIQUE NONCLUSTERED ([model_name])
);

-- CreateTable
CREATE TABLE [prodmon].[group] (
    [id] INT NOT NULL IDENTITY(1,1),
    [group_name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [group_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [group_group_name_key] UNIQUE NONCLUSTERED ([group_name])
);

-- CreateTable
CREATE TABLE [energycons].[powermeter] (
    [id] INT NOT NULL IDENTITY(1,1),
    [voltage] FLOAT(53) NOT NULL,
    [ampere] FLOAT(53) NOT NULL,
    [power] FLOAT(53) NOT NULL,
    [frequency] FLOAT(53) NOT NULL,
    [time] DATETIME2 NOT NULL CONSTRAINT [powermeter_time_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [powermeter_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [prodmon].[arduino] ADD CONSTRAINT [arduino_assigned_transaction_fkey] FOREIGN KEY ([assigned_transaction]) REFERENCES [prodmon].[transaction]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [prodmon].[arduino] ADD CONSTRAINT [arduino_username_fkey] FOREIGN KEY ([username]) REFERENCES [prodmon].[user]([username]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [prodmon].[transaction] ADD CONSTRAINT [transaction_id_group_fkey] FOREIGN KEY ([id_group]) REFERENCES [prodmon].[group]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [prodmon].[transaction] ADD CONSTRAINT [transaction_id_model_fkey] FOREIGN KEY ([id_model]) REFERENCES [prodmon].[model]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [prodmon].[transaction] ADD CONSTRAINT [transaction_assign_arduino_fkey] FOREIGN KEY ([assign_arduino]) REFERENCES [prodmon].[arduino]([nama_arduino]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [prodmon].[scan_history] ADD CONSTRAINT [scan_history_id_transaction_fkey] FOREIGN KEY ([id_transaction]) REFERENCES [prodmon].[transaction]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

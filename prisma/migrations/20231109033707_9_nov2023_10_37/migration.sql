BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[arduino] (
    [nama_arduino] VARCHAR(255) NOT NULL,
    [usernameId] NVARCHAR(1000) NOT NULL,
    [assigned_transaction] INT,
    CONSTRAINT [arduino_nama_arduino_key] UNIQUE NONCLUSTERED ([nama_arduino]),
    CONSTRAINT [arduino_assigned_transaction_key] UNIQUE NONCLUSTERED ([assigned_transaction])
);

-- CreateTable
CREATE TABLE [dbo].[user] (
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [user_pkey] PRIMARY KEY CLUSTERED ([username]),
    CONSTRAINT [user_username_key] UNIQUE NONCLUSTERED ([username])
);

-- CreateTable
CREATE TABLE [dbo].[transaction] (
    [id] INT NOT NULL IDENTITY(1,1),
    [id_model] INT NOT NULL,
    [id_group] INT NOT NULL,
    [plan] INT NOT NULL,
    [actual] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [transaction_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [transaction_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [transaction_id_model_key] UNIQUE NONCLUSTERED ([id_model]),
    CONSTRAINT [transaction_id_group_key] UNIQUE NONCLUSTERED ([id_group])
);

-- CreateTable
CREATE TABLE [dbo].[scan_history] (
    [id] INT NOT NULL IDENTITY(1,1),
    [id_transaction] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [scan_history_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [scan_history_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[model] (
    [id] INT NOT NULL IDENTITY(1,1),
    [model_name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [model_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [model_model_name_key] UNIQUE NONCLUSTERED ([model_name])
);

-- CreateTable
CREATE TABLE [dbo].[group] (
    [id] INT NOT NULL IDENTITY(1,1),
    [group_name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [group_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [group_group_name_key] UNIQUE NONCLUSTERED ([group_name])
);

-- AddForeignKey
ALTER TABLE [dbo].[arduino] ADD CONSTRAINT [arduino_assigned_transaction_fkey] FOREIGN KEY ([assigned_transaction]) REFERENCES [dbo].[transaction]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[arduino] ADD CONSTRAINT [arduino_usernameId_fkey] FOREIGN KEY ([usernameId]) REFERENCES [dbo].[user]([username]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[transaction] ADD CONSTRAINT [transaction_id_group_fkey] FOREIGN KEY ([id_group]) REFERENCES [dbo].[group]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[transaction] ADD CONSTRAINT [transaction_id_model_fkey] FOREIGN KEY ([id_model]) REFERENCES [dbo].[model]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[scan_history] ADD CONSTRAINT [scan_history_id_transaction_fkey] FOREIGN KEY ([id_transaction]) REFERENCES [dbo].[transaction]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

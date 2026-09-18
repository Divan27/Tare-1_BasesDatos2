USE AdventureWorks2022;
GO

CREATE OR ALTER PROCEDURE dbo.sp_ListarCategorias
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        ProductCategoryID,
        Name,
        ModifiedDate
    FROM Production.ProductCategory
    ORDER BY ProductCategoryID;
END;
GO


CREATE OR ALTER PROCEDURE dbo.sp_InsertarCategoria
    @Name NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Production.ProductCategory
        (Name, rowguid, ModifiedDate)
    VALUES
        (@Name, NEWID(), GETDATE());

    SELECT SCOPE_IDENTITY() AS ProductCategoryID;
END;
GO


CREATE OR ALTER PROCEDURE dbo.sp_ActualizarCategoria
    @ProductCategoryID INT,
    @Name NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Production.ProductCategory
    SET
        Name = @Name,
        ModifiedDate = GETDATE()
    WHERE ProductCategoryID = @ProductCategoryID;

    SELECT @@ROWCOUNT AS FilasAfectadas;
END;
GO


CREATE OR ALTER PROCEDURE dbo.sp_EliminarCategoria
    @ProductCategoryID INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM Production.ProductCategory
    WHERE ProductCategoryID = @ProductCategoryID;

    SELECT @@ROWCOUNT AS FilasAfectadas;
END;
GO


CREATE OR ALTER PROCEDURE dbo.sp_CategoriasConSubcategorias
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        pc.ProductCategoryID,
        pc.Name AS Categoria,
        ps.ProductSubcategoryID,
        ps.Name AS Subcategoria
    FROM Production.ProductCategory pc
    INNER JOIN Production.ProductSubcategory ps
        ON pc.ProductCategoryID = ps.ProductCategoryID
    ORDER BY pc.Name, ps.Name;
END;
GO


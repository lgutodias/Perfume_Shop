<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
        <table id="perfumeTable" border="1" class="indent">
            <thead>
                <tr>
                    <th colspan="5">Perfume Shop Items</th>
                </tr>
                <tr>
                    <th>Select</th>
                    <th>Brand</th>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <xsl:for-each select="/perfume_catalog/section">
                    <tr>
                        <td colspan="5">
                            <xsl:value-of select="@name" />
                        </td>
                    </tr>
                    <xsl:for-each select="perfume">
                        <tr id="{position()}">
                            <xsl:attribute name="sale">
                                <xsl:value-of select="boolean(@sale)" />
                            </xsl:attribute>
                            <td align="center-left">
                                <input name="brand0" type="checkbox" />
                            </td>
                            <td>
                                <xsl:value-of select="brand" />
                            </td>
                            <td align="center">
                                <xsl:value-of select="name" />
                            </td>
                            <td align="center-right">
                                <xsl:value-of select="size" />
                            </td>
                            <td align="right">
                                <xsl:value-of select="price" />
                            </td>
                        </tr>
                    </xsl:for-each>
                </xsl:for-each>
            </tbody>
        </table>
    </xsl:template>
</xsl:stylesheet>
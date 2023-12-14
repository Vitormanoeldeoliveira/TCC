import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

export const AppropriationReport = (item) => {
    
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const headerReport = [
        {
            text: 'Plantação',
            style: 'tableHeader',
            fontSize: 8,
            fillColor: '#b4cfce',
            bold: true
        },
        {
            text: 'Tipo safra',
            style: 'tableHeader',
            fontSize: 8,
            fillColor: '#b4cfce',
            bold: true
        },
        {
            text: "Preço do adubo",
            style: "tableHeader",
            fontSize: 8,
            fillColor: "#b4cfce",
            bold: true,
        },
        {
            text: 'Preço do calcario',
            style: 'tableHeader',
            fontSize: 8,
            fillColor: '#b4cfce',
            bold: true
        },
        {
            text: 'Custos investidos em insumos',
            style: 'tableHeader',
            fontSize: 8,
            fillColor: '#b4cfce',
            bold: true
        },
        {
            text: 'Valor inicial investido',
            style: 'tableHeader',
            fontSize: 8,
            alignment: 'center',
            fillColor: '#b4cfce',
            bold: true
        },
        {
            text: 'Quantidade vendida',
            style: 'tableHeader',
            fontSize: 8,
            alignment: 'center',
            fillColor: '#b4cfce',
            bold: true
        },
        {
            text: 'Valor da venda',
            style: 'tableHeader',
            fontSize: 8,
            alignment: 'center',
            fillColor: '#b4cfce',
            bold: true
        },
    ];

    const dadosReport = item.map((items) => {
        return [
            { text: items?.lucroSafra?.plantacao?.descricao, fontSize: 8, margin: [0, 2, 0, 2] },
            { text: items?.lucroSafra?.plantacao?.tipo, fontSize: 8, margin: [0, 2, 0, 2] },
            { text: items?.lucroGasto?.preco_adubo, fontSize: 8, margin: [0, 2, 0, 2] },
            { text: items?.lucroGasto?.preco_calcario, fontSize: 8, margin: [0, 2, 0, 2] },
            { text: items?.lucroGasto?.preco_insumos, fontSize: 8, margin: [0, 2, 0, 2] },
            { text: items?.lucroGasto?.preco_inicial ?? 0, fontSize: 8, margin: [0, 2, 0, 2] },
            { text: items?.qtd_venda, fontSize: 8, margin: [0, 2, 0, 2] },
            { text: items?.valor_venda, fontSize: 8, margin: [0, 2, 0, 2] },
        ]
    })

    const reportTitleReport = [
        {
            text: "Gastos",
            alignment: 'center',
            margin: [0, 10, 0, 0],
            fontSize: 15,
            bold: true,
            colSpan: 8,
            fillColor: "white",
        }
    ];

    const formattedDate = new Date();

    const dateLine = [
        {
            text: `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()}`,
            alignment: 'center',
            fontSize: 7,
            colSpan: 8,
            fillColor: "white",
            margin: [0, 0, 0, 10],
        },
    ];

    const titleLine = [
        ...reportTitleReport,
        {}, {}, {}, {}, {}, {}, {}
    ];

    const emptyLine = [
        {}, {}, {}, {}, {}, {}, {}, {}
    ];

    const details = [{
        table: {
            headerRows: 3,
            widths: [50, 100, 50, 100, 100, 90, 90, 90],
            body: [
                titleLine,
                dateLine,
                emptyLine,
                headerReport,
                ...dadosReport,
                emptyLine,
            ]
        },
        layout: {
            hLineWidth: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 0 : 0;
            },
            vLineWidth: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 0 : 0;
            },
            hLineColor: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
            },
            vLineColor: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
            },
            fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex % 2 === 0) ? "#e6fefd" : null;
            },
        }
    }];

    const rodape = (currentPage, pageCount) => {
        return [
            {
                image: 'data:image/png;base64,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',
                width: 300,
                alignment: 'rigth',
                margin: [0, -20, 0, 0], 
            },
            {
                text: currentPage + '/' + pageCount,
                alignment: 'right',
                fontSize: 9,
                margin: [0, 0, 20, 0] // left, top, right, bottom
            }
        ];
    };

    const docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        pageMargins: [50, 10, 15, 20],
        content: [ details ],
        footer: rodape,
    };

    pdfMake.createPdf(docDefinition).download();
};
import React, { useState } from 'react';
import { Document, Page, pdfjs  } from 'react-pdf';
  
export const Pdf = () => {

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  /*PDF Path*/
  const url = 'YourFile.pdf';

  /*PDF worker */
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
    
  /*When document gets loaded successfully*/
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  }
  
  const changePage = (offset) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }
  
  const previousPage = () => {
    changePage(-1);
  }
  
  const nextPage = () => {
    changePage(1);
  }
  
  return (
    
    <div>
      <div>
            <div>
            Pagina {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
            </div>
            <div>
            <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
            className="btn btn-outline-primary"
            >
            Anterior
            </button>
            <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
            className="btn btn-outline-primary" 
            >
            Siguiente
            </button>
            </div>
        </div>
        <div>
        <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
        >
            <Page pageNumber={pageNumber} />
        </Document>
        </div>
    </div>
  );
}


 
import { PropTypes } from 'prop-types';
import ChevronLeft from '../../assets/GreaterThan.svg'
import ChevronRight from '../../assets/chevron-right.svg'

const Pagination = ({ pageNumber, setPageNumber, totalpages }) => {

    const changePage = (page) => {
        if (page < 1 || page > totalpages) return; // if page is out of bounds
        setPageNumber(page);
    }


    const RenderPagination = () => {
        const range = 2;
        const   pagination = [] ;

        let startPage;
        let endPage;

        // Determine the range of page to display using the prviously defined range of 2
        if (pageNumber <= range + 1) { //if near the start of the pagination ie pageNumber is less than or equl to 3
            startPage = 1;  // sartPage should be 1
            endPage = Math.min(4, totalpages); //and endPage should be the minimum of 7 and the total number of pages
        } else if(pageNumber >= totalpages - range ) { // if near the end of the pagination ie pageNumber is greater than or equal to the total number of pages minus the range of 2
            startPage = Math.max(totalpages - 3, 1); // startPage should be the maximum of the total number of pages minus 6 and 1
            endPage = totalpages; // endPage should be the total number of pages
        }else {
            startPage = pageNumber - range; // for pages in the middle, startPage should be the pageNumber minus the range of 2
            endPage = pageNumber + range; // endPage should be the pageNumber plus the range of 2
        }

        // Add Previous Button
        pagination.push(<button key="prev" className='flexCenterCenter' onClick={() => changePage(pageNumber - 1)} disabled={pageNumber === 1}>  <img src={ChevronRight} alt="" />Prev </button>)
        

        // Add first page and ellipsis if there are pages before the start range
        if (startPage > 1) {
            pagination.push(<button key='1' onClick={() => changePage(1)} disabled={pageNumber === 1}> 1 </button>)
            
        }
            if (startPage > 2) {
                pagination.push( <span key="ellipsis1">...</span>)
                
            }
       
        // Add page numbers within the range
        for (let i = startPage; i <= endPage; i++) {
            pagination.push( <button key={i} onClick={() => changePage(i)} disabled={pageNumber === i}> {i} </button>)
             
        }


        // Add ellipsis if there are pages after the end range 
        if (endPage < totalpages) {
            if (endPage < totalpages -1) {
                pagination.push(<span key="ellipsis2">...</span>)
                 
            }
            pagination.push( <button key={totalpages} onClick={() => changePage(totalpages)} disabled={pageNumber === totalpages}> {totalpages} </button>)
            
        }

        // Add Next Button
        pagination.push(<button key="next" className='flexCenterCenter' onClick={() => changePage(pageNumber + 1)} disabled={pageNumber === totalpages}> Next<img src={ChevronLeft} alt="" /></button>)
        

        return pagination
    }

    return (

        <>
              {(pageNumber < totalpages) && <button className='viewMore' onClick={() => changePage(pageNumber + 1)} aria-label='viewMore'> View More </button>}
            <div  className="paginationControls">
                {RenderPagination()}
            </div>
        </>
    )


}

Pagination.propTypes = {
    totalpages: PropTypes.number.isRequired,
    pageNumber: PropTypes.number.isRequired,
    setPageNumber: PropTypes.func.isRequired
}

export default Pagination
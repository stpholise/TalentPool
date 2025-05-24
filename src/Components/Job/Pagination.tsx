 

import ChevronLeft from '../../assets/GreaterThan.svg'
import ChevronRight from '../../assets/chevron-right.svg'

interface PaginationProps {
    pageNumber: number;
    setPageNumber: ( page: number ) => void;
    totalpages: number;
}

const Pagination: React.FC<PaginationProps> = ({ pageNumber, setPageNumber, totalpages }) => {

    const changePage = (page:number) => {
        if (page < 1 || page > totalpages) return; // if page is out of bounds
        setPageNumber(page);
    }


    const RenderPagination = () => {
        const range = 2;
        const   pagination = [] ;

        let startPage;
        let endPage;

    
        if (pageNumber <= range + 1) { 
            startPage = 1;  
            endPage = Math.min(4, totalpages); 
        } else if(pageNumber >= totalpages - range ) { 
            startPage = Math.max(totalpages - 3, 1); 
            endPage = totalpages; 
        }else {
            startPage = pageNumber - range; 
            endPage = pageNumber + range; 
        }

       
        pagination.push(<button key="prev" className='flexCenterCenter' onClick={() => changePage(pageNumber - 1)} disabled={pageNumber === 1}>  <img src={ChevronRight} alt="" />Prev </button>)
        

      
        if (startPage > 1) {
            pagination.push(<button key='1' onClick={() => changePage(1)} disabled={pageNumber === 1}> 1 </button>)
            
        }
            if (startPage > 2) {
                pagination.push( <span key="ellipsis1">...</span>)
                
            }
       

        for (let i = startPage; i <= endPage; i++) {
            pagination.push( <button key={i} onClick={() => changePage(i)} disabled={pageNumber === i}> {i} </button>)
             
        }

        if (endPage < totalpages) {
            if (endPage < totalpages -1) {
                pagination.push(<span key="ellipsis2">...</span>)
                 
            }
            pagination.push( <button key={totalpages} onClick={() => changePage(totalpages)} disabled={pageNumber === totalpages}> {totalpages} </button>)
            
        }


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



export default Pagination
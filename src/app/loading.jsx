const Loading = () => {
    return (
        <div className="min-h-[80vh] w-full flex flex-col items-center justify-center px-4">
            <div className="relative flex items-center justify-center">
               
                <div className="absolute w-20 h-20 bg-linear-to-r from-[#4f39f6]/20 to-[#9514fa]/20 rounded-full animate-ping duration-1000"></div>
                
               
                <div className="w-16 h-16 rounded-full border-4 border-neutral-200 dark:border-neutral-800 border-t-4 border-t-[#4f39f6] animate-spin"></div>
                
              
                <div className="absolute w-6 h-6 bg-linear-to-r from-[#4f39f6] to-[#9514fa] rounded-full shadow-md shadow-[#4f39f6]/30"></div>
            </div>
            
           
            <div className="mt-6 text-center">
                <h3 className="text-lg font-bold bg-linear-to-r from-[#4f39f6] via-[#9514fa] to-[#4f39f6] bg-size-[200%_auto] bg-clip-text text-transparent animate-pulse tracking-wide">
                    Loading MediQueue
                </h3>
                <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 font-medium">
                    Please wait a moment...
                </p>
            </div>
        </div>
    );
};

export default Loading;
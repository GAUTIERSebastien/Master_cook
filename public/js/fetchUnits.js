export function fetchUnits(){
    fetch('https://localhost:4343/units', {
    method: "GET",
    headers:
    {
        "content-type": "application/json",

    },
}
)
    .then(res => res.json())
    .then(units=>{
        // console.log(units);
    units.forEach(unit => {
        
        const units = []
        units.push(unit)
       
        return units;
        
    });
        
    })
}

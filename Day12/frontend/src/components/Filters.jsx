export default function Filters({ search, setSearch, program, setProgram, year, setYear }) 
{
    return (
        <div className="filters-container">
            <input
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="filter-input"
            />

            <select value={program} onChange={(e) => setProgram(e.target.value)} className="filter-select">
                <option value="All">All Programs</option>
                <option value="BSIT">BSIT</option>
                <option value="BSCS">BSCS</option>
                <option value="BSIS">BSIS</option>
            </select>

            <select value={year} onChange={(e) => setYear(e.target.value)} className="filter-select">
                <option value="All">All Years</option>
                <option value="1">Year 1</option>
                <option value="2">Year 2</option>
                <option value="3">Year 3</option>
                <option value="4">Year 4</option>
            </select>
        </div>
    )
}